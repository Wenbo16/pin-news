#!/bin/bash
service mongod start
# sudo docker run -idt -v `pwd`/data:/data  --name redis --network app-test -p 6379:6379 redis
sudo docker start redis
sudo docker run -it --network app-test --rm wenbofeng/news_pipeline_service
sudo docker run -it --name backend_server_service --network app-test -p 4040:4040 --rm wenbofeng/backend_server_service
sudo docker run -it --name web_server_service --network app-test -p 8080:8080 --rm wenbofeng/web_server_service
sudo docker run -it --name client --network app-test -p 3000:3000 --rm wenbofeng/client
