FROM node:14 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY ormconfig.js ./

RUN yarn

COPY . .

RUN yarn build

FROM node:14 AS production

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY ormconfig.js ./

RUN yarn install --only=production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/tsconfig.build.json .
COPY --from=development /usr/src/app/migration ./migration

CMD ["node", "dist/main"]