import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router = Router();

export default (): Router => {
    authRoutes(router);
    userRoutes(router);
    return router;
};
