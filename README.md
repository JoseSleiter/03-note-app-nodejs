# Introduction architecture pattern MVC

- [Introdución](#introduction-architecture-pattern-MVC)
  - [Definicion de estructura de carpetas](#project-structure-folder)
  - [Descripcion del contenido de las carpetas](#project-structure-define)
  - [Instalacion](#installation)
  - [Run app](#running-the-app)
  - [Run test](#test)
  - [Extras](#how-install-lint-/-tsc-into-any-project)

## Project structure folder
src/
├── controllers/
├── interfaces/
├── repositories/
├── routes/
├── schemas/
├── services/
└── app.ts

## Project structure define 
* controllers: Contains the controller classes, which handle HTTP requests and responses.
* interfaces: Contains the contracts or interfaces.
* repositories: Contains the application's data access layer, which handles communication with external data sources such as databases.
* routes: Contains the relations to controllers, repositories and services.
* schemas: Contains the application's schemas (Mongoose), which define the structure and validation rules for incoming and outgoing data.
* services: Contains the business logic or use cases.
* app.ts: The main file that bootstraps the application and sets up any necessary middleware.

## Installation
1-step: 
```bash
    npm i 
```
2-step: Copy and change .env-example to .env, then setting your personal values.
3-step: Go to [Run app](#running-the-app) and waiting a few seconds while the dist folder is generated.

## Running the app
Note: Remember make first [Instalacion](#installation) step. 

```bash
    npm run dev
```
or with Docker

```bash
    docker build -t api-notes .
    docker run -it --cpu-period=100000 --cpu-quota=50000 -d -p 3000:3000 --name api-notes --env-file ./.env api-notes
```

## Running the test
```bash
    npm run test:unit
    npm run test:coverage
```

## How install lint / tsc into any project
```bash
    npm i eslint -D #add eslint
    npx eslint --init #define eslint
    npm i -D typescript @types/express @types/node #add types to typescript 
    npx tsc --init #define typescript 
```
## DOCS
[Cats http-code](https://http.cat/)
[config typescript](https://www.typescriptlang.org/tsconfig#module)
[install husky](https://twitter.com/midudev/status/1555552823017934849/photo/1)