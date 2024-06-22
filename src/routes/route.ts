import express, { Router } from 'express';
import { login, logout } from '../controller/authController';
import { deleteGuru, guru, insertGuru, showGuru, updateGuru } from '../controller/guruController';
import { operatorMiddleware } from '../middleware/operatorMiddleware';

const router: Router = express.Router();

// Auth
router.post('/auth/login', login)
router.post('/auth/logout', logout)



// Guru Router
router.use(operatorMiddleware);
router.get('/guru', guru)
router.post('/guru', insertGuru)
router.put('/guru/:id', updateGuru)
router.delete('/guru/:id', deleteGuru)
router.get('/guru/:id', showGuru)

export {
    router
}