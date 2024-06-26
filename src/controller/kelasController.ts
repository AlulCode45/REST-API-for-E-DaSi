import { Request, Response } from "express";
import { prisma } from "../models/prismaModel";

async function kelas(req: Request, res: Response) {
    try {
        const kelas = await prisma.kelas.findMany({
            include: {
                siswa: true,
                jurusan: true,
                tahunAjaran: true
            }
        })
        return res.json({
            data: kelas,
            message: "Success"
        })
    } catch (error) {
        return res.status(401).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect()
    }
}
async function showKelas(req: Request, res: Response) {
    const { id } = req.params
    try {
        const kelas = await prisma.kelas.findFirstOrThrow({
            where: {
                id: parseInt(id)
            },
            include: {
                siswa: true,
                jurusan: true,
                tahunAjaran: true
            }
        })
        return res.json({
            data: kelas,
            message: "Success"
        })
    } catch (error) {
        return res.status(401).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect()
    }
}
async function deleteKelas(req: Request, res: Response) {
    const { id } = req.params
    try {
        await prisma.kelas.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.json({
            message: "Success"
        })
    } catch (error) {
        return res.status(401).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect()
    }
}
async function insertKelas(req: Request, res: Response) {
    const { nama, jurusanId, tahunAjaranId } = req.body
    try {
        const saveKelas = {
            jurusanId: jurusanId,
            tahunAjaranId: tahunAjaranId,
            nama: nama
        }

        await prisma.kelas.create({
            data: saveKelas
        })

        return res.json({
            data: saveKelas,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error,
            data: {
                jurusanId: jurusanId,
                tahunAjaranId: tahunAjaranId,
                nama: nama
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function updateKelas(req: Request, res: Response) {
    const { id } = req.params
    const { nama, jurusanId, tahunAjaranId } = req.body
    try {
        const newData = {
            jurusanId: jurusanId,
            tahunAjaranId: tahunAjaranId,
            nama: nama
        }
        await prisma.kelas.update({
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
                jurusanId: jurusanId,
                tahunAjaranId: tahunAjaranId,
                nama: nama
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}

export {
    kelas,
    showKelas,
    deleteKelas,
    insertKelas,
    updateKelas
}