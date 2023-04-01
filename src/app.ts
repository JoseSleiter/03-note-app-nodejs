// Venders
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import helmet from "helmet";
import mongoose from 'mongoose';
import morgan from "morgan";

// Config
import { auth0Config } from './config/auth0.config';

// Routes && Middlewares
import { HandleInternalError } from './middlewares/handle-internal-error.middleware';
import { HandleNotFoundPath } from './middlewares/handle-not-found-path.middleware';
import noteRoute from './routes/v1/note.routes';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 3000;
const URL_MONGODB = process.env.MONGO_URI || 'mongodb://localhost:27017/local';

// Beging Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.static("public"));

// Routes Public
app.get('/doc-public', (_req, res) => {
    res.send('You are Logged out');
});

// Routes Private
app.use(auth(auth0Config)); // Login, Callback, Logout
app.get('/', (req, res) => {
    res.status(201).send(req.oidc.isAuthenticated() ? 'You are Logged in. To <b>logged out</b>, you must go to path: <b>/logout</b>' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
    res.status(200).send(JSON.stringify(req.oidc.user));
});
app.use('/api/v1', noteRoute)

// Ending Middlewares
const handleNotFoundPath = new HandleNotFoundPath()
const handleInternalError = new HandleInternalError()
app.use("*", handleNotFoundPath.check);
app.use(handleInternalError.check);
app.use((
    _err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
) => {
    return res.status(500).send({
        error: "Oops! Error in server",
        socialNetwork: [
            'If you need a FullStack Developer for your projects, contact me by linkedin',
            'https://www.linkedin.com/in/jose-sleiter-rios/',
            'https://github.com/JoseSleiter/'
        ]
    });
})
// Start the DB
mongoose.connect(`${URL_MONGODB}`, {
    autoIndex: true,
    autoCreate: true
})

// Start the server
app.listen(PORT, () => {
    console.log(`⚡️[Server] is listening on port http://localhost:${PORT}`);
});