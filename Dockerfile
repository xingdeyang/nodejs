FROM node:10.16.3-alpine
COPY . /app
WORKDIR /app
RUN apk add --no-cache \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3003
CMD node index.js