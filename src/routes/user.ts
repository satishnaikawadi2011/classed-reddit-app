import { login, reegisterUser, me, logout } from './../controllers/user';
import {Router} from 'express'
import auth from '../middleware/auth'

const router = Router()

// POST 
// Public
router.post('/register',reegisterUser)

// POST
// Public
router.post('/login',login)

// GET
// Private
router.get('/me',auth,me)


// GET
// Private
router.get('/logout',auth,logout)

export default router