import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import service from './service';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../../utils/http';
import { User } from '@prisma/client';

interface DecodedUser {
    id: number;
    role: string;
}

const authenticateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse('Unauthorized', StatusCodes.UNAUTHORIZED));
    }

    try {
        const decoded = jwt.verify(token, 'secret-key') as DecodedUser;
        const user = await service.getUserById(+decoded.id);
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse('Invalid token', StatusCodes.UNAUTHORIZED));
        }

        req.body.user = user;
        next();
    } catch (error) {
        console.error('[Auth.middleware.authenticateJWT]:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse('Internal server error', StatusCodes.INTERNAL_SERVER_ERROR));
    }
};

const checkUserRole = (role: string) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.body.user;

    if ( user.role?.name !== role) {
        return res.status(StatusCodes.FORBIDDEN).json(ErrorResponse('You dont have permission to perform this action', StatusCodes.FORBIDDEN));
    }

    next();
};

export default {authenticateJWT, checkUserRole};