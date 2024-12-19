import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    @MinLength(3, { message: 'Username must be at least 3 characters' })
    @MaxLength(30, { message: 'Username must be at most 30 characters' })
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @MaxLength(100, { message: 'Password must be at most 100 characters' })
    password: string;
}

export interface RegisterUserResponse {
    username: string;
    email: string;
}
