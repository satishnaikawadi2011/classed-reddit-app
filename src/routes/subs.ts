import {createSub} from './../controllers/subs';
import {Router} from 'express'
import auth from '../middleware/auth'

const router = Router()

// Post
// Private
router.post('/create',auth,createSub)


export default router