FROM hub-mirror.test.cn/sreopen/node:18.16 as builder

RUN npm config set registry https://registry.npm.test.cn && \
    npm config set loglevel=error && \
    npm i -g pnpm@8.7.6

ADD ./ /app
WORKDIR /app

RUN pnpm i

RUN pnpm run build

# copy build dist
FROM khub.test.cn/sreopen/nginx:stable

ENV PROJECT_PATH /data/app
ENV NGINX_HOME_PATH /etc/nginx

COPY --from=builder /app/nginx/ $NGINX_HOME_PATH/
COPY --from=builder /app/dist/ $PROJECT_PATH

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
