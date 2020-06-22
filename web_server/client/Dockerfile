# 基于node11
FROM node:9

# 设置环境变量
# ENV REACT_APP_WEB_SERVER_HOST='web_server_service'
# ENV REACT_APP_WEB_SERVER_PORT='8080'

# 安装nginx
# RUN apt-get update && apt-get install -y nginx

# 把 package.json package-lock.json 复制到/app目录下
# 为了npm install可以缓存
COPY package*.json /client/

# 切换到app目录
WORKDIR /client

# 安装依赖
RUN npm install

# 把所有源代码拷贝到/app
COPY . /client

# 打包构建
# RUN npm run build

# 拷贝配置文件到nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# 启动nginx，关闭守护式运行，否则容器启动后会立刻关闭
CMD ["npm", "start"]

