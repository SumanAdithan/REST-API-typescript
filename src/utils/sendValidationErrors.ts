import { ValidationErrorDTO } from '@dtos';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

export const sendValidationErrors = (errors: ValidationError[], res: Response<ValidationErrorDTO>): void => {
    const errorDetails = Object.fromEntries(
        errors.map((err) => [err.property, { message: Object.values(err.constraints).pop() }])
    );
    res.status(400).json(errorDetails);
    return;
};
