import {createPost} from './../controllers/post';
import {Router} from 'express'
import auth from '../middleware/auth'

const router = Router()

// Post
// Private
router.post('/create',auth,createPost)


export default router