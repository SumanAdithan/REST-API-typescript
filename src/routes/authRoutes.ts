import { Router } from 'express';
import { loginUser, registerUser } from '@controllers';

const authRoutes = (router: Router) => {
    router.post('/auth/register', registerUser);
    router.post('/auth/login', loginUser);
};

export default authRoutes;
