import { hashPassword } from '@utils';
import { ErrorDTO, RegisterUserDTO, RegisterUserResponse, ValidationErrorDTO } from '@dtos';
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
        res.status(500).json({
            error: 'Internal server error.',
        });
        return;
    }
};
