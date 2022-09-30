# pull official base image
FROM node:14.18.2-alpine as builder

# set working directory
WORKDIR /app

RUN apk add bash
RUN apk add yarn

RUN bash

RUN echo $(ls -1 .)
RUN echo $(node --version)

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY . .

RUN yarn install
RUN yarn build:dev

# web-server stage
FROM keymetrics/pm2:latest-slim as web-server

RUN apt update && apt install bash

WORKDIR /app
RUN mkdir -p /app

COPY --from=builder /app/build /app
COPY --from=builder /app/static-serve.json /pm2.json
EXPOSE 3000

# CMD ["pm2", "serve", "/app", "3000", "--spa"]
# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "/pm2.json" ]