# -*- coding: utf-8 -*-

import datetime
import hashlib
import os
import sys
import json

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common/newsapi_client'))

import redis
from news_api_client import NewsApiClient
from cloudAMQP_client import CloudAMQPClient

NEWS_SOURCES = 'bbc-news, bbc-sport, bloomberg, cnn, entertainment-weekly'

NEWS_TIME_OUT_IN_SECONDS = 3600 * 24 * 1
SLEEP_TIME_IN_SECONDS = 10

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://ncbqvnsd:9t_kIWFv9bkiMhUYAuyQqBFoH8oCQpvx@otter.rmq.cloudamqp.com/ncbqvnsd"
DEDUPE_NEWS_TASK_QUEUE_NAME = "pin_news_deduper"

REDIS_HOST = os.environ['REDIS_HOST']
REDIS_PORT = os.environ['REDIS_PORT']

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)
dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
newsApiClient = NewsApiClient(api_key='6e402bf74e5e4376b4d991ce169d1ed3')

while True:

	news_list = newsApiClient.get_top_headlines(None, NEWS_SOURCES)
	num_of_new_news = 0

	for news in news_list:
		news_digest = hashlib.md5(news['title'].encode('utf-8')).hexdigest()

		if redis_client.get(news_digest) is None:
			num_of_new_news = num_of_new_news + 1
			news['digest'] = news_digest

			# If 'publishedAt' is None, set it to current UTC time.
			if news['publishedAt'] is None:
				# Make the time in format YYYY-MM_DDTHH:MM:SS in UTC
				news['publishedAt'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

			redis_client.set(news_digest, json.dumps(news))
			redis_client.expire(news_digest, NEWS_TIME_OUT_IN_SECONDS)
			print ('send message')
			dedupe_news_queue_client.sendMessage(news)

	print ("Fetched %d news." % num_of_new_news)

	dedupe_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)
