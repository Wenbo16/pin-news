import os
import sys
import json
import operations
from bson.json_util import dumps
from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
from jsonrpc import JSONRPCResponseManager, dispatcher
sys.path.append(os.path.join(os.path.dirname(__file__), '../', 'common'))
import mongodb_client

SERVER_HOST = 'localhost'
SERVER_PORT = 4040
NEWS_TABLE_NAME = "pin_news"


@dispatcher.add_method
def getNews():
  db= mongodb_client.get_db()
  news = list(db['NEWS_TABLE_NAME'].find())
  return json.loads(dumps(news))

""" Get news summaries for a user """
@dispatcher.add_method
def getNewsSummariesForUser(user_id, page_num):
    return operations.getNewsSummariesForUser(user_id, page_num)

""" Log user news clicks """
# @dispatcher.add_method
# def logNewsClickForUser(user_id, news_id):
    # return operations.logNewsClickForUser(user_id, news_id)


@Request.application
def application(request):
    # Dispatcher is dictionary {<method_name>: callable}
    dispatcher["echo"] = lambda s: s
    dispatcher["add"] = lambda a, b: a + b

    response = JSONRPCResponseManager.handle(
        request.data, dispatcher)
    return Response(response.json, mimetype='application/json')


if __name__ == '__main__':
    print ("Starting HTTP server on %s:%d" % (SERVER_HOST, SERVER_PORT))
    run_simple(SERVER_HOST, SERVER_PORT, application)