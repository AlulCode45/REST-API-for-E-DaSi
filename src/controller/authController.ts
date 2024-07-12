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

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Username / password wrong'
            });
        }

        const expireIn: number = 60 * 60 * 5

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

async function validateToken(req: Request, res: Response) {
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
        return res.status(200).json({ message: 'Valid', data: decoded });
    } catch (error) {
        return res.status(400).json({ message: "Error", error: error || 'An error occurred' });
    }
}

async function refreshToken(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    const { id, nama, username, role } = req.body
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }
    try {
        const expireIn: number = 60 * 60 * 2
        const token = jwt.sign({
            id: id,
            nama: nama,
            username: username,
            role: role
        }, process.env.JWT_SECRET!, {
            expiresIn: expireIn
        })
        return res.status(200).json({ message: 'Success', data: token });
    } catch (error) {
        return res.status(400).json({ message: "Error", error: error || 'An error occurred' });
    }
}

export {
    login,
    logout,
    validateToken, refreshToken
}
