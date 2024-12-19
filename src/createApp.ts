import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

export const createApp = () => {
    const app = express();

    dotenv.config({ path: path.join(__dirname, 'config/config.env') });
    app.use(
        cors({
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(compression());
    return app;
};
