FROM node:18-alpine as build-stage

WORKDIR /workspace

COPY package.json yarn.lock /workspace/
RUN yarn --forzen-lockfile
COPY . .

RUN yarn build
# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/

FROM node:18-alpine as production-stage

RUN apk add curl xmlstarlet bash

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /

COPY --from=build-stage /workspace/node_modules ./node_modules
COPY --from=build-stage /workspace/package*.json ./
COPY --from=build-stage /workspace/dist ./dist
RUN mkdir -p /app

RUN ls / -lsah
RUN ls . -lsah

VOLUME [ "/dist/" ]
VOLUME [ "/dist/app" ]

EXPOSE ${PORT}

CMD ["yarn", "start:prod"]



