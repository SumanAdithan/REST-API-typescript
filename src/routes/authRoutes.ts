import { Router } from 'express';
import { registerUser } from '@controllers';

const authRoutes = (router: Router) => {
    router.post('/auth/register', registerUser);
};

export default authRoutes;
