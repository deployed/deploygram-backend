## Description

API for the deploygram - our simplified version of the instagram that will be the basis for workshops with students.

## Installation

```bash
$ yarn

```

## Running the app

```bash
# Postgres database
$ docker-compose up -d

# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## API

/api - Swagger

## Deployment using docker

* firstly, build the image and tag it
* tagged image should be added to docker-compose.yml
* create a pull request with bumped version
* pull the changes on the server
* turn off current containers (`docker-compose down`)
* turn on new version (`docker-compose up -d`)

### Build

    docker build . -t deploygram-backend_deploygram:<<tag>>

e.g.

    docker build . -t deploygram-backend_deploygram:15

### Deployment

    docker-compose down
    docker-compose up -d
