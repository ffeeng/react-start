# -----------------------
# 1️⃣ Build Stage
# -----------------------
FROM node:22-alpine AS builder

# 设置 npm 源（可选）
# RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm --registry https://registry.npmmirror.com/ --fetch-timeout=60000
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build:dev

# -----------------------
# 2️⃣ Production Stage
# -----------------------
FROM nginx:alpine

# 删除默认配置（可选）
RUN rm -rf /usr/share/nginx/html/*

# 将构建产物复制到 nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝 nginx 配置（用于 SPA history 模式）
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
