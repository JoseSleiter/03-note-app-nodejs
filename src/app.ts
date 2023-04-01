import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from "helmet";
import morgan from "morgan";
import mongoose from 'mongoose';
import noteRoute from './routes/v1/note.routes';
import { NotFoundPath } from './middlewares/not-found-path.middleware';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;
const URL_MONGODB = process.env.MONGO_URI || 'mongodb://localhost:27017/local';

// Beging Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));

// Routes
app.use('/api/v1', noteRoute)

// Ending Middlewares
const notFoundPath = new NotFoundPath()
app.use("*", notFoundPath.check);

// Start the DB
mongoose.connect(`${URL_MONGODB}`, {
    autoIndex: true,
    autoCreate: true
})

// Start the server
app.listen(PORT, () => {
    console.log(`⚡️[Server] is listening on port http://localhost:${PORT}`);
});