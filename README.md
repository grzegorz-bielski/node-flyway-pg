## flyway-node-pg-express playground

An exemplary integration of:

- node with TS
- postgres and [pg driver](https://node-postgres.com/)
- pure SQL with [tagged template strings](https://github.com/felixfbecker/node-sql-template-strings)
- [flyway migration tool](https://flywaydb.org/)
- multiple express instances with file upload

### Prerequisites

- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Running DB and migrations

```bash
docker compose up
```

### Running the repository script

```bash
npm run start
```

### Running the upload service

```bash
npm run uploader
```

Next: visit the `localhost:3000` to access the file upload form

### Running psql in the container

```bash
docker exec -it flyway-demo-db bash
psql -U $POSTGRES_USER
```
