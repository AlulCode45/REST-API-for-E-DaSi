import express, { Router } from 'express';
import { login, logout, refreshToken, validateToken } from '../controller/authController';
import { deleteGuru, guru, insertGuru, showGuru, updateGuru } from '../controller/guruController';
import { operatorMiddleware } from '../middleware/operatorMiddleware';
import { deleteOrangTua, insertOrangTua, orangTua, showOrangTua, updateOrangTua } from '../controller/orangtuaController';
import { deleteSiswa, insertSiswa, showSiswa, siswa, updateSiswa } from "../controller/siswaController";
import { deleteKelas, insertKelas, kelas, showKelas, updateKelas } from '../controller/kelasController';
import { deleteTahunAjaran, insertTahunAjaran, showTahunAjaran, tahunAjaran, updateTahunAjaran } from '../controller/tahunAjaranController';

const router: Router = express.Router();

// Auth
router.post('/auth/login', login)
router.post('/auth/logout', logout)

router.use(operatorMiddleware);
router.get('/auth/validate', validateToken)
router.get('/auth/refresh', refreshToken)

// Guru Router
router.get('/guru', guru)
router.post('/guru', insertGuru)
router.put('/guru/:id', updateGuru)
router.delete('/guru/:id', deleteGuru)
router.get('/guru/:id', showGuru)

// Orang tua Router
router.get('/orang-tua', orangTua)
router.post('/orang-tua', insertOrangTua)
router.put('/orang-tua/:id', updateOrangTua)
router.delete('/orang-tua/:id', deleteOrangTua)
router.get('/orang-tua/:id', showOrangTua)

//Siswa router
router.get('/siswa', siswa)
router.post('/siswa', insertSiswa)
router.put('/siswa/:id', updateSiswa)
router.delete('/siswa/:id', deleteSiswa)
router.get('/siswa/:id', showSiswa)

//Kelas router
router.get('/kelas', kelas)
router.post('/kelas', insertKelas)
router.put('/kelas/:id', updateKelas)
router.delete('/kelas/:id', deleteKelas)
router.get('/kelas/:id', showKelas)


//Kelas router
router.get('/tahun-ajaran', tahunAjaran)
router.post('/tahun-ajaran', insertTahunAjaran)
router.put('/tahun-ajaran/:id', updateTahunAjaran)
router.delete('/tahun-ajaran/:id', deleteTahunAjaran)
router.get('/tahun-ajaran/:id', showTahunAjaran)



export {
    router
}