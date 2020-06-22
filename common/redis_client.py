import os
import redis

REDIS_HOST = os.environ['REDIS_HOST']
REDIS_PORT = os.environ['REDIS_PORT']

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT, db=0)
def get_redis():
    return redis_client
