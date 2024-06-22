import { prisma } from "../models/prismaModel";
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

async function login(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        const user = await prisma.operator.findFirstOrThrow({
            where: {
                username: username
            }
        });

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Username / password wrong'
            });
        }

        const expireIn = 60 * 60 * 2

        const token = jwt.sign({
            id: user.id,
            nama: user.nama,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET!, {
            expiresIn: expireIn
        })

        await prisma.operator.update({
            where: {
                id: user.id
            },
            data: {
                token: token
            }
        });

        await prisma.$disconnect();
        return res.status(200).json({
            data: {
                nama: user.nama,
                username: user.username,
                fotoProfile: user.fotoProfile,
                role: user.role
            },
            token: token
        });

    } catch (error) {
        await prisma.$disconnect();
        return res.status(401).json({
            error: error || 'An error occurred'
        });
    }
}

async function logout(req: Request, res: Response) {
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

        const user = await prisma.operator.findFirstOrThrow({
            where: { id: (decoded as any).id }
        });

        await prisma.operator.update({
            where: { id: user.id },
            data: { token: null }
        });

        await prisma.$disconnect();
        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        await prisma.$disconnect();
        return res.status(400).json({ message: "Error", error: error || 'An error occurred' });
    }
}
export {
    login,
    logout
}
