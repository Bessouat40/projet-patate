FROM node:20.4.0

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install -f

COPY . ./
RUN npx browserslist@latest --update-db
ENV NODE_OPTIONS="--max_old_space_size=512"
RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
