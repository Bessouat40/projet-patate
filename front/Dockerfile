FROM node:20.4.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -f

COPY . ./

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
