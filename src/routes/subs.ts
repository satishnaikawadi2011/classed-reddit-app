import {createSub} from './../controllers/subs';
import {Router} from 'express'
import auth from '../middleware/auth'

const router = Router()

//@method  POST
//@access  Private
//@desc    create a new sub
router.post('/create',auth,createSub)


export default router