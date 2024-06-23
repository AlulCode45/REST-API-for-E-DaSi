import { Request, Response } from "express";
import { prisma } from "../models/prismaModel";
import { TahunAjaran } from "@prisma/client";

async function tahunAjaran(req: Request, res: Response) {
    try {
        const data = await prisma.tahunAjaran.findMany()
        return res.json({
            data: data,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}
async function showTahunAjaran(req: Request, res: Response) {
    const { id } = req.params
    try {
        const data = await prisma.tahunAjaran.findFirstOrThrow({
            where: {
                id: parseInt(id)
            }
        })
        return res.json({
            data: data,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}
async function deleteTahunAjaran(req: Request, res: Response) {
    const { id } = req.params
    try {
        const data = await prisma.tahunAjaran.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.json({
            data: data,
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}
async function insertTahunAjaran(req: Request, res: Response) {
    const { tahun } = req.body
    try {
        await prisma.tahunAjaran.create({
            data: {
                tahun: tahun
            }
        })
        return res.json({
            data: {
                tahun
            },
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

}
async function updateTahunAjaran(req: Request, res: Response) {
    const { id } = req.params
    const { tahun } = req.body
    try {
        await prisma.tahunAjaran.update({
            where: {
                id: parseInt(id)
            },
            data: {
                tahun: tahun
            }
        })
        return res.json({
            data: {
                tahun
            },
            message: "Success"
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
}

export {
    tahunAjaran,
    showTahunAjaran,
    deleteTahunAjaran,
    insertTahunAjaran,
    updateTahunAjaran
}