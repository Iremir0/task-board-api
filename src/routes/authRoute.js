import express from 'express'
import {login,register,logout} from '../controllers/authController.js'
import { validateRequest } from '../middleware/validateRequest.js';
import { registerSchema, loginSchema } from '../validators/authValidators.js';

const router = express.Router();

router.post('/login',validateRequest(loginSchema),login)
router.post('/register',validateRequest(registerSchema),register)
router.post('/logout',logout)

export default router