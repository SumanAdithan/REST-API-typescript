import { UpdateUserDTO } from '@dtos';
import { Request, Response } from 'express';
import { deleteUserByID, getUserById, getUsers } from 'models';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users. Please try again later.' });
    }
};

export const updateUser = async (req: Request<{ id: string }, {}, UpdateUserDTO>, res: Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const user = await getUserById(id);
        user.username = username.trim();
        await user.save();
        res.status(200).json({
            username: user.username,
        });
        return;
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUserByID(id);
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
