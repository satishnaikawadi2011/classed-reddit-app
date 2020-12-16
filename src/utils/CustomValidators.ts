import {User} from '../entity/User'

export const isEmailOrUsernameAlreadyExists = async(email:string,username:string) => {
    const errors:any = {}
    let isExists = false;
    const userEmail = await User.findOne({email:email})
    if (userEmail){
        errors.email = 'User with this email already exists,login instead.'
        isExists = true
    }

    const userUsername = await User.findOne({username:username})
    if (userUsername){
        errors.username = 'User with this username already exists,try another one.'
        isExists = true
    }

    return {errors,isExists}
}