import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

export default (): Router => {
    authRoutes(router);
    return router;
};
