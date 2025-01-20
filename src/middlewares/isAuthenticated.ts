import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    next();
};
