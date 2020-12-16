import { User } from './../entity/User';
import { isEmailOrUsernameAlreadyExists } from './../utils/CustomValidators';
import {Request,Response} from 'express';
import { validate,isEmpty } from 'class-validator';
import transformClassErrors from '../utils/transformClassErrors';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'

export const reegisterUser = async(req:Request,res:Response) => {
    const {email,password,username} = req.body
    const {errors,isExists} = await isEmailOrUsernameAlreadyExists(email,username)
    if (isExists){
        res.status(404).json({errors})    
    }
    
    try {
        const user = new User({email,password,username})
        const classErrors = await validate(user)
        if (classErrors.length > 0) {
            const transformedErrors = await transformClassErrors(classErrors)
            res.status(404).json({errors:transformedErrors})
        }

        await user.save()

        res.status(200).json({user})
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Something went wrong!'})
    }

}


export const login = async(req:Request,res:Response) => {
    const {username,password} =  req.body
    try {
        let errors:any = {}
        if(isEmpty(username)) errors.username = 'Username must not be empty.'
        if(isEmpty(password)) errors.password = 'Password must not be empty.'

        if(Object.keys(errors).length > 0){
            return res.status(400).json({errors})
        }
        const user = await User.findOne({username})
        if (!user){
            return res.status(404).json({error:'User not found !'})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            return res.status(401).json({error:'Invalid credentials !'})
        }

        const token = await jwt.sign({username},process.env.JWT_SECRET)

        res.set('Set-Cookie',cookie.serialize('token', token,{
            httpOnly:true,
            secure:process.env.NODE_ENV == 'production',
            path:'/',
            sameSite:'strict',
            maxAge:3600
        }))

        return res.json({user,token}) 
    } catch (err) {
        console.log(err)
        res.status(500).json({message:'Something went wrong!'})
    }
}


export const me = async (req:Request,res:Response) => {
    return res.json({user:res.locals.user})
}

export const logout = async (req:Request,res:Response) => {
    res.set('Set-Cookie',cookie.serialize('token','',{
        httpOnly:true,
        secure:process.env.NODE_ENV == 'production',
        path:'/',
        sameSite:'strict',
        expires:new Date(0)
    }))

    res.status(200).json({success:'true'})
}