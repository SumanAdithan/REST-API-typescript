import { NextFunction, Request, Response } from 'express';

export const isOwner = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (req.session.userId !== id) {
        res.status(403).json({ error: 'Unauthorized access' });
        return;
    }
    next();
};
