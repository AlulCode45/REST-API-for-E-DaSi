import { Request, Response } from "express";
import { prisma } from "../models/prismaModel";
import { Siswa } from "@prisma/client";

async function siswa(req: Request, res: Response) {
    try {
        const siswa = await prisma.siswa.findMany({
            include: {
                kelas: {
                    select: {
                        jurusan: {
                            select: {
                                id: true,
                                nama: true
                            }
                        }
                    }
                },
                orangTua: true
            }
        })
        return res.json({
            data: siswa,
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
async function showSiswa(req: Request, res: Response) {
    const { id } = req.params
    try {
        const siswa = await prisma.siswa.findFirstOrThrow({
            where: {
                id: parseInt(id)
            },
            include: {
                kelas: {
                    select: {
                        jurusan: {
                            select: {
                                id: true,
                                nama: true
                            }
                        }
                    }
                },
                orangTua: true
            }
        })
        return res.json({
            data: siswa,
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
async function deleteSiswa(req: Request, res: Response) {
    const { id } = req.params
    try {
        await prisma.siswa.delete({
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
async function insertSiswa(req: Request, res: Response) {
    const { nama, nis, nisn, alamat, jenisKelamin, kelasId, tanggalLahir } = req.body
    try {
        const saveSiswa = {
            nisn: nisn,
            nama: nama,
            alamat: alamat,
            jenisKelamin: jenisKelamin,
            kelasId: kelasId,
            nis: nis,
            tanggalLahir: tanggalLahir
        }

        await prisma.siswa.create({
            data: saveSiswa
        })

        return res.json({
            data: saveSiswa,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error,
            data: {
                nisn: nisn,
                nama: nama,
                alamat: alamat,
                jenisKelamin: jenisKelamin,
                kelasId: kelasId,
                nis: nis,
                tanggalLahir: tanggalLahir
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function updateSiswa(req: Request, res: Response) {
    const { id } = req.params
    const { nama, nis, alamat, jenisKelamin, kelasId, tanggalLahir, nisn } = req.body
    try {
        const newData = {
            nisn: nisn,
            nama: nama,
            alamat: alamat,
            jenisKelamin: jenisKelamin,
            kelasId: kelasId,
            nis: nis,
            tanggalLahir: tanggalLahir
        }
        await prisma.siswa.update({
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
                nisn: nisn,
                nama: nama,
                alamat: alamat,
                jenisKelamin: jenisKelamin,
                kelasId: kelasId,
                nis: nis,
                tanggalLahir: tanggalLahir
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}

export {
    siswa,
    showSiswa,
    deleteSiswa,
    insertSiswa,
    updateSiswa
}