FROM node:9
COPY . /web_server

WORKDIR /web_server
RUN npm install
RUN npm -g install nodemon
ENV BACKEND_SERVER_HOST='10.0.2.15'
ENV BACKEND_SERVER_PORT='4040'

EXPOSE 8080
CMD ["npm","start"]