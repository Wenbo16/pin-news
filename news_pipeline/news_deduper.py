import datetime
import os
import sys

from dateutil import parser
from sklearn.feature_extraction.text import TfidfVectorizer

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import mongodb_client
from cloudAMQP_client import CloudAMQPClient


DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://ncbqvnsd:9t_kIWFv9bkiMhUYAuyQqBFoH8oCQpvx@otter.rmq.cloudamqp.com/ncbqvnsd"
DEDUPE_NEWS_TASK_QUEUE_NAME = "pin_news_deduper"

SLEEP_TIME_IN_SECONDS = 1

SAME_NEWS_SIMILARITY_THRESHOLD = 0.9

NEWS_TABLE_NAME = "pin_news"

dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)

def handle_message(msg):
    if msg is None or not isinstance(msg, dict) :
        return
    task = msg
    content = task['content']
    if content is None:
        return

    # Get all recent news based on publishedAt
    published_at = parser.parse(task['publishedAt'])
    published_at_day_begin = datetime.datetime(published_at.year,
                                               published_at.month,
                                               published_at.day - 1,
                                               0, 0, 0, 0)
    published_at_day_end = published_at_day_begin + datetime.timedelta(days=1)

    db = mongodb_client.get_db()

    # transform iterable to a list
    same_day_news_list = list(db[NEWS_TABLE_NAME].find(
        {'publishedAt': {'$gte': published_at_day_begin,
                         '$lt': published_at_day_end}}))

    if same_day_news_list is not None and len(same_day_news_list) > 0:
        documents = [str(news['content']) for news in same_day_news_list]
        documents.insert(0, content)

        # Calculate similarity matrix
        tfidf = TfidfVectorizer().fit_transform(documents)
        pairwise_sim = tfidf * tfidf.T

        print (pairwise_sim)

        rows, _ = pairwise_sim.shape

        for row in range(1, rows):
            if pairwise_sim[row, 0] > SAME_NEWS_SIMILARITY_THRESHOLD:
                print ("Duplicated news. Ignore")
                return

    # Transform string to date format which support mongodb date search
    task['publishedAt'] = parser.parse(task['publishedAt'])
    db[NEWS_TABLE_NAME].replace_one({'digest': task['digest']}, task, upsert=True)

while True:
    if dedupe_news_queue_client is not None:
        msg = dedupe_news_queue_client.getMessage()
        if msg is not None:
            # Parse and process the task
            try:
                handle_message(msg)
            except Exception as e:
                print (e)
                pass

        dedupe_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
