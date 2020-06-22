FROM wenbofeng/app_base:latest


ENV MONGO_DB_HOST='10.0.2.15'
ENV MONGO_DB_PORT='27017'
ENV DB_NAME='pin-news'
ENV REDIS_HOST='redis'
ENV REDIS_PORT='6379'

COPY . /backend_server

WORKDIR /backend_server

EXPOSE 4040

CMD ["python3", "./service.py"]
