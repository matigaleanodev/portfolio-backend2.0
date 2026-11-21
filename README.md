# Portfolio Backend 2.0

[Español](README.es.md)

Deprecated NestJS backend for the previous portfolio iteration. Kept as a reference; the current portfolio ecosystem is linked below.

## Stack

NestJS · TypeScript · TypeORM · MySQL · JWT.

## Scope and configuration

Contains portfolio-data, authentication and contact modules. Database, JWT and mail settings are application configuration; use local values and keep credentials outside version control.

## Local development

Use a Node.js toolchain compatible with package.json and the dependency lockfile, when present.

```sh
npm install
npm run start:dev
npm run build
npm test
```

## Related repositories

- [portfolio2.0](https://github.com/matigaleanodev/portfolio2.0)
- [portfolio](https://github.com/matigaleanodev/portfolio)
- [portfolio-api](https://github.com/matigaleanodev/portfolio-api)
- [portfolio-cloud](https://github.com/matigaleanodev/portfolio-cloud)
