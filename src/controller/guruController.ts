import { Request, Response, response } from "express";
import { prisma } from "../models/prismaModel";

async function guru(req: Request, res: Response) {
    try {
        const guru = await prisma.guru.findMany()
        return res.json({
            data: guru,
            message: "Success"
        }).status(200)
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function insertGuru(req: Request, res: Response) {
    const { nama, nip, alamat } = req.body
    const save = {
        nama: nama,
        nip: nip,
        alamat: alamat
    }

    try {
        await prisma.guru.create({
            data: save
        })

        return res.status(201).json({
            data: save,
            message: "Success"
        })

    } catch (error) {
        return res.status(400).json({
            error: error,
            data: save
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function updateGuru(req: Request, res: Response) {
    const { id } = req.params
    const { nama, nip, alamat } = req.body
    try {
        await prisma.guru.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nama: nama,
                nip: nip,
                alamat: alamat
            }
        })

        return res.status(200).json({
            data: {
                nama: nama,
                nip: nip,
                alamat: alamat
            },
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            data: {
                nama: nama,
                nip: nip,
                alamat: alamat
            },
            error: error
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function deleteGuru(req: Request, res: Response) {
    const { id } = req.params
    try {

        await prisma.mataPelajaran.deleteMany({
            where: {
                guruId: parseInt(id)
            }
        })

        await prisma.guru.delete({
            where: {
                id: parseInt(id)
            },
            include: {
                mataPelajaran: true
            }
        })

        return res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function showGuru(req: Request, res: Response) {
    const { id } = req.params
    try {
        const guru = await prisma.guru.findFirstOrThrow({
            where: {
                id: parseInt(id)
            }
        })

        return res.status(200).json({
            data: guru,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    } finally {
        await prisma.$disconnect()
    }
}

export {
    guru,
    insertGuru,
    updateGuru,
    deleteGuru,
    showGuru
}