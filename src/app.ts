import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from "helmet";
import morgan from "morgan";
import mongoose from 'mongoose';
import noteRoute from './routes/v1/note.routes';

dotenv.config();
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

// Routes
app.use('/api/v1', noteRoute)
app.use("*", (_req, res, _next) => {
    res.send({
        error: "Unknown resource"
    });
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