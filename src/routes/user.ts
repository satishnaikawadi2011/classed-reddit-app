import { login, reegisterUser } from './../controllers/user';
import {Router} from 'express'

const router = Router()

// POST 
// Public
router.post('/register',reegisterUser)

// POST
// Public
router.post('/login',login)

export default router