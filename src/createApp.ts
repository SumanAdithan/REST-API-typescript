import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import routes from '@routes';

export const createApp = () => {
    const app = express();

    dotenv.config({ path: path.join(__dirname, 'config/config.env') });
    app.use(
        cors({
            credentials: true,
        })
    );
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                secure: process.env.NODE_ENV === 'production',
            },
            store: MongoStore.create({
                mongoUrl: process.env.DB_LOCAL_URI,
                collectionName: 'sessions',
            }),
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(routes());

    return app;
};
