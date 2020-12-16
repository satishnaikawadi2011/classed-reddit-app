import { login, reegisterUser, me, logout } from './../controllers/user';
import {Router} from 'express'
import auth from '../middleware/auth'

const router = Router()

//@method  POST
//@access  Public
//@desc    register as a new user
router.post('/register',reegisterUser)

//@method  POST
//@access  Public
//@desc    login to the app
router.post('/login',login)

//@method  GET
//@access  Private
//@desc    get current user info
router.get('/me',auth,me)

//@method  GET
//@access  Private
//@desc    logout from the app
router.get('/logout',auth,logout)

export default router