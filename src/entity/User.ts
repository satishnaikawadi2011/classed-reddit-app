import { IsEmail, MinLength } from "class-validator";
import {Entity as TOEntity, Column,Index,BeforeInsert} from "typeorm";
import bcrypt from 'bcrypt'
import {Exclude} from 'class-transformer'
import Entity from './Entity'

@TOEntity("users")
export class User extends Entity {

    constructor(user:Partial<User>){
        super()
        Object.assign(this,user)
    }

    @Index()
    @IsEmail({},{message:'Please enter a valid email address.'})
    @Column({unique:true})
    email: string;

    @Index()
    @MinLength(4,{message:'Username must be at least 4 characters long.'})
    @Column({unique:true})
    username: string;

    @Exclude()
    @Index()
    @MinLength(6,{message:'Password must be at least 6 characters long'})
    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 6)
    }
}
