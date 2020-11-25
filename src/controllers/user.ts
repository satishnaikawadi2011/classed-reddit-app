import { User } from './../entity/User';
import { isEmailOrUsernameAlreadyExists } from './../utils/CustomValidators';
import {Request,Response} from 'express';
import { validate } from 'class-validator';
import transformClassErrors from '../utils/transformClassErrors';

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
    }

}
