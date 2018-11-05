FROM node:8.12.0

ADD ./.babelrc /app/.babelrc
ADD ./bin /app/bin
ADD ./config /app/config
ADD ./lib /app/lib
ADD ./launcher.js /app/launcher.js
ADD ./server.js /app/server.js
ADD ./server.js /app/server.js
ADD ./package.json /app/package.json
ADD ./migrat.config.js /app/migrat.config.js
ADD ./migrations /app/migrations
ADD ./imports /app/imports

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD node launcher.js
