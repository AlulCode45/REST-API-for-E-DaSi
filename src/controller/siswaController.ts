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
    const { id } = req.params // NISN
    try {
        const siswa = await prisma.siswa.findFirstOrThrow({
            where: {
                nisn: parseInt(id)
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
    const { id } = req.params; // NISN

    try {
        // Parsing id to integer
        const nisn = parseInt(id, 10);

        // Memastikan siswa dengan nisn tersebut ada
        const siswa = await prisma.siswa.findUnique({
            where: { nisn }
        });

        if (!siswa) {
            return res.status(404).json({
                message: "Siswa tidak ditemukan"
            });
        }

        // Menghapus semua orang tua yang terkait dengan siswa ini
        await prisma.orangTua.deleteMany({
            where: {
                siswaId: siswa.id
            }
        });

        // Menghapus siswa
        await prisma.siswa.delete({
            where: {
                nisn
            }
        });

        return res.json({
            message: "Success"
        });
    } catch (error) {
        return res.status(400).json({
            error: error || 'An error occurred'
        });
    } finally {
        await prisma.$disconnect();
    }
}
async function insertSiswa(req: Request, res: Response) {
    const { nama, nis, nisn, alamat, jenisKelamin, kelasId, tanggalLahir } = req.body;

    // Validasi input
    if (!nama || !nis || !nisn || !alamat || !jenisKelamin || !kelasId || !tanggalLahir) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    try {
        const saveSiswa = {
            nisn: parseInt(nisn, 10),
            nama: nama,
            alamat: alamat,
            jenisKelamin: jenisKelamin,
            kelasId: parseInt(kelasId, 10),
            nis: nis,
            tanggalLahir: new Date(tanggalLahir)
        };

        const createdSiswa = await prisma.siswa.create({
            data: saveSiswa
        });

        return res.json({
            data: createdSiswa,
            message: "Success"
        });
    } catch (error) {
        return res.status(400).json({
            error: error || 'An error occurred',
            data: {
                nisn: nisn,
                nama: nama,
                alamat: alamat,
                jenisKelamin: jenisKelamin,
                kelasId: kelasId,
                nis: nis,
                tanggalLahir: tanggalLahir
            }
        });
    } finally {
        await prisma.$disconnect();
    }
}
async function updateSiswa(req: Request, res: Response) {
    const { id } = req.params // NISN
    const { nama, nis, alamat, jenisKelamin, kelasId, tanggalLahir, nisn } = req.body
    try {
        const newData = {
            nisn: parseInt(nisn),
            nama: nama,
            alamat: alamat,
            jenisKelamin: jenisKelamin,
            kelasId: parseInt(kelasId),
            nis: nis,
            tanggalLahir: new Date(tanggalLahir)
        }
        await prisma.siswa.update({
            where: {
                nisn: parseInt(id),
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
                kelasId: parseInt(kelasId),
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