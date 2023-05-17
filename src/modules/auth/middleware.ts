import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedUser {
  // Define the structure of the decoded user object
  // based on your specific JWT payload
  id: string;
  username: string;
}

const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key') as DecodedUser;
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

export default authenticateJWT;