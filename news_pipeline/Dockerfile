FROM wenbofeng/app_base:latest

COPY . /news_pipeline_service

ENV MONGO_DB_HOST='10.0.2.15'
ENV MONGO_DB_PORT='27017'
ENV DB_NAME='pin-news'
ENV REDIS_HOST='redis'
ENV REDIS_PORT='6379'

WORKDIR /news_pipeline_service
CMD ["./news_pipeline_launcher.sh"]
