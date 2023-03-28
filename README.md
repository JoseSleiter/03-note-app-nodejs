



## Project structure like (architecture pattern MVC)
src/
├── controllers/
├── interfaces/
├── repositories/
├── routes/
├── schemas/
├── services/
└── app.ts

controllers: Contains the controller classes, which handle HTTP requests and responses.
interfaces: Contains the contracts or interfaces.
repositories: Contains the application's data access layer, which handles communication with external data sources such as databases.
routes: Contains the relations to controllers, repositories and services.
schemas: Contains the application's schemas (Mongoose), which define the structure and validation rules for incoming and outgoing data.
services: Contains the business logic or use cases.
app.ts: The main file that bootstraps the application and sets up any necessary middleware.


## npm add lint / tsc
```bash
    npm i eslint -D
    npx eslint --init
    npm i -D typescript @types/express @types/node
    npx tsc --init
```