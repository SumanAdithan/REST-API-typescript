import { comparePassword, generateToken, hashPassword } from '@utils';
import { ErrorDTO, LoginUserResponse, RegisterUserDTO, RegisterUserResponse, ValidationErrorDTO } from '@dtos';
import { Request, Response } from 'express-serve-static-core';
import { createUser, getUserByEmail } from 'models';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { sendValidationErrors } from 'utils/sendValidationErrors';

export const registerUser = async (
    req: Request<{}, {}, RegisterUserDTO>,
    res: Response<RegisterUserResponse | ErrorDTO | ValidationErrorDTO>
) => {
    try {
        const registerUserDTO = plainToClass(RegisterUserDTO, req.body);
        const errors = await validate(registerUserDTO);
        if (errors.length > 0) {
            sendValidationErrors(errors, res);
            return;
        }
        let { username, email, password } = req.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({
                error: 'Email is already in use. Please choose another one.',
            });
            return;
        }

        const hashedPassword = await hashPassword(password);
        const user = await createUser({
            email,
            username,
            authentication: {
                password: hashedPassword,
            },
        });
        res.status(201).json({
            username: user.username,
            email: user.email,
        });
        return;
    } catch (err) {
        console.error('error during register');
        res.status(500).json({
            error: 'Internal server error.',
        });
        return;
    }
};

export const loginUser = async (req: Request<{}, {}, RegisterUserDTO>, res: Response<LoginUserResponse | ErrorDTO>) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const isPasswordMatch = await comparePassword(password, user.authentication.password);
        if (!isPasswordMatch) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        req.session.userId = user._id.toString();

        res.status(200).json({
            message: 'Login successful',
            redirectUrl: '/',
            user: {
                username: user.username,
                email: user.email,
            },
        });
        return;
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
};
