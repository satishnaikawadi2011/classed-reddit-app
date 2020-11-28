import { User } from './../entity/User';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export default async (req: Request, res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.token
        if(!token){
            throw new Error('Unauthenticated !')
        }

        const {username}:any = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({username})

        if(!user){
            throw new Error('Unauthenticated !')
        }

        res.locals.user = user;
        return next() 
    } catch (err) {
        console.log(err)
        return res.status(401).json({error:'Unauthenticated !'})
    }
}