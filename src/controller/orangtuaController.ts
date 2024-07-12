import { Request, Response } from "express";
import { prisma } from "../models/prismaModel";

async function orangTua(req: Request, res: Response) {
    try {
        const orangTua = await prisma.orangTua.findMany({
            include: {
                siswa: {
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
                        }
                    }
                }
            }
        })
        return res.json({
            data: orangTua,
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
async function showOrangTua(req: Request, res: Response) {
    const { id } = req.params
    try {
        const orangTua = await prisma.orangTua.findFirstOrThrow({
            where: {
                id: parseInt(id)
            },
            include: {
                siswa: {
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
                        }
                    }
                }
            }
        })
        return res.json({
            data: orangTua,
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
async function deleteOrangTua(req: Request, res: Response) {
    const { id } = req.params
    try {
        await prisma.orangTua.delete({
            where: {
                id: parseInt(id)
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
async function insertOrangTua(req: Request, res: Response) {
    const { nama, alamat, hubungan, siswaId, telepon, tanggalLahir } = req.body
    try {
        const saveOrangTua = {
            alamat: alamat,
            hubungan: hubungan,
            nama: nama,
            siswaId: siswaId,
            telepon: telepon,
            tanggalLahir: tanggalLahir
        }

        await prisma.orangTua.create({
            data: saveOrangTua
        })

        return res.json({
            data: saveOrangTua,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error,
            data: {
                alamat: alamat,
                hubungan: hubungan,
                nama: nama,
                siswaId: siswaId,
                telepon: telepon,
                tanggalLahir: tanggalLahir
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}
async function updateOrangTua(req: Request, res: Response) {
    const { id } = req.params
    const { nama, alamat, hubungan, siswaId, telepon, tanggalLahir } = req.body
    try {
        const newData = {
            alamat: alamat,
            hubungan: hubungan,
            nama: nama,
            siswaId: siswaId,
            telepon: telepon,
            tanggalLahir: tanggalLahir
        }
        await prisma.orangTua.update({
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
                alamat: alamat,
                hubungan: hubungan,
                nama: nama,
                siswaId: siswaId,
                telepon: telepon,
                tanggalLahir: tanggalLahir
            }
        })
    } finally {
        await prisma.$disconnect()
    }
}

export {
    orangTua,
    showOrangTua,
    deleteOrangTua,
    insertOrangTua,
    updateOrangTua
}