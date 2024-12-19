import mongoose from 'mongoose';
import { CreateUser, UpdateUser } from '@types';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const UserModel = mongoose.model('User', UserSchema);
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email: email });
export const getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (user: CreateUser) => UserModel.create(user);
export const updateUserById = ({ id, updateItems }: UpdateUser) => UserModel.findByIdAndUpdate(id, updateItems);
export const deleteUserByID = (_id: string) => UserModel.findOneAndDelete({ _id });
