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
RUN yarn build

# web-server stage
FROM web-serve/react-app as web-server

RUN mkdir -p /app

COPY --from=builder /app/build /app
COPY --from=builder /app/static-serve.json /dist/config.json

RUN echo "${PUBLIC_URL}" 
RUN echo "${REACT_APP_ROUTE_URL}" 

# Show current folder structure in logs
RUN ls -al -R

