FROM node:10.16.3-alpine
COPY . /app
WORKDIR /app
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3003
CMD node index.js