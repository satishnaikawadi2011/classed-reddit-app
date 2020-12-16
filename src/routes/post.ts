import { createPost, getPosts,getPost } from './../controllers/post';
import {Router} from 'express'
import auth from '../middleware/auth'

const router = Router()

//@method  POST
//@access  Private
//@desc    Create a new post
router.post('/create',auth,createPost)


//@method  GET
//@access  Public
//@desc    fetch all posts
router.get('/',getPosts)
 
//@method  GET
//@access  Public
//@desc    fetch a single post
router.get('/:identifier/:slug',getPost)

export default router