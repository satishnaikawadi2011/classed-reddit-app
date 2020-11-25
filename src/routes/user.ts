import { reegisterUser } from './../controllers/user';
import {Router} from 'express'

const router = Router()

// POST 
// Public
router.post('/register',reegisterUser)


export default router