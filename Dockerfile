FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
RUN yarn global add serve
COPY . .
RUN yarn build
CMD serve -s build