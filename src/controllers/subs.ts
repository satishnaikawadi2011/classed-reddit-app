import { Sub } from './../entity/Sub';
import { isEmpty } from 'class-validator';
import { User } from './../entity/User';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';


export const createSub = async(req:Request,res:Response) => {
    const {name,title,description} = req.body;

    const user:User = res.locals.user

    try {
        let errors:any = {}
        if(isEmpty(name)) errors.name = 'Name must not be empty !'
        if(isEmpty(title)) errors.title = 'Title must not be empty !'

        const sub = await getRepository(Sub).
        createQueryBuilder('sub').
        where('lower(sub.name) = :name',{name:name.toLowerCase()}).
        getOne()

        if(sub) errors.name = 'Sub exists already !'

        if(Object.keys(errors).length > 0){
            res.status(400).json({errors})
        }

        const newSub = new Sub({name,description,title,user})
        await newSub.save()

        res.json({sub:newSub})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Something went wrong!'})
    }
}