import { IJwtAcesstoken } from '../models/server.model';
import { JWT_SECRET } from './env.config';
import jwt from 'jsonwebtoken';


export const createJwtAccessToken = (user: IJwtAcesstoken) => {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '864000s' })
}

export const createTokenForForgotPassword = (email: string) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '600s' })
}
