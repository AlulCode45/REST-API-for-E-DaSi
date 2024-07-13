import { Request, Response } from "express";
import { prisma } from "../models/prismaModel";

async function jurusan(req: Request, res: Response) {
    try {
        const jurusan = await prisma.jurusan.findMany({
            include: {
                kelas: true
            }
        })
        return res.json({
            data: jurusan,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect()
    }
}
async function showJurusan(req: Request, res: Response) {
    const { id } = req.params
    try {
        const jurusan = await prisma.jurusan.findFirstOrThrow({
            where: {
                id: parseInt(id)
            },
            include: {
                kelas: true
            }
        })
        return res.json({
            data: jurusan,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect()
    }
}
async function deleteJurusan(req: Request, res: Response) {
    const { id } = req.params
    try {
        await prisma.kelas.deleteMany({
            where: {
                jurusanId: parseInt(id)
            }
        });
        await prisma.jurusan.delete({
            where: {
                id: parseInt(id),
            }
        })
        return res.json({
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect()
    }
}
async function insertJurusan(req: Request, res: Response) {
    const { nama, deskripsi } = req.body
    try {
        const saveJurusan = {
            deskripsi: deskripsi,
            nama: nama
        }

        await prisma.jurusan.create({
            data: saveJurusan
        })

        return res.json({
            data: saveJurusan,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error,
            data: {
                deskripsi: deskripsi,
                nama: nama
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function updateJurusan(req: Request, res: Response) {
    const { id } = req.params
    const { nama, deskripsi } = req.body
    try {
        const newData = {
            deskripsi: deskripsi,
            nama: nama
        }
        await prisma.jurusan.update({
            where: {
                id: parseInt(id),
            },
            data: newData
        })
        return res.json({
            data: newData,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error,
            data: {
                deskripsi: deskripsi,
                nama: nama
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}

export {
    jurusan,
    showJurusan,
    deleteJurusan,
    insertJurusan,
    updateJurusan
}