import { Router } from 'express';
import { isAuthenticated, isOwner } from 'middlewares';
import { deleteUser, getAllUsers, updateUser } from 'controllers/userController';

const userRoutes = (router: Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
};

export default userRoutes;
