import { NextFunction, Request, Response } from "express";
import { prisma } from "../models/prismaModel";
import jwt from 'jsonwebtoken';

async function operatorMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if (typeof decoded === 'object' && 'id' in decoded) {
            next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        await prisma.$disconnect();
        return res.status(401).json({ message: "Invalid token", error: error || 'An error occurred' });
    }
}

export { operatorMiddleware };
