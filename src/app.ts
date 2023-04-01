/* eslint-disable import/first */
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import './controllers/note.controller';
import './controllers/test.controller';
import { RegisterRoutes } from './routes';
import noteRoute from './routes/v1/note.routes';

dotenv.config();
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("dist"));

// Routes
app.use('/api/v1', noteRoute)

// @ts-ignore
RegisterRoutes(app)

// Swagger
app.use(
    "/doc",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || 500;
    const body: any = {
        fields: err.fields || undefined,
        message: err.message || 'An error occurred during the request.',
        name: err.name,
        status,
    };
    res.status(status).json(body);
});

// Start the server
const PORT = process.env.PORT || 3000;
const URL_MONGODB = process.env.MONGO_URI || 'mongodb://localhost:27017/local';

mongoose.connect(`${URL_MONGODB}`, {
    autoIndex: true,
    autoCreate: true
})

app.listen(PORT, () => {
    console.log(`⚡️[Server] is listening on port http://localhost:${PORT}`);
});