FROM node:20.4.0

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install -f

COPY ./public /app/public
COPY ./src /app/src

CMD npm run start