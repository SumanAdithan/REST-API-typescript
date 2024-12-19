import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const SECRET = 'REST-API-TYPESCRIPT';

export const random = () => crypto.randomBytes(128).toString('base64');
export const generateToken = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
