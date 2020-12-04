import { Sub } from './../entity/Sub';
import { Post } from './../entity/Post';
import { Request, Response } from 'express';


export const createPost = async(req:Request,res:Response) => {
    const {body,title,sub} = req.body

    const user = res.locals.user

    if(title.trim === ''){
        res.status(400).json({error:{title:'Title must not be empty !'}})
    }

    try {
        const subRecord = await Sub.findOneOrFail({name:sub})

        const post = new Post({body,title,sub:subRecord,user})

        await post.save()

        res.json({post})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Something went wrong!'})
    }
}