import { IsEmail, Length, Min, MinLength } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import bcrypt from 'bcrypt'
import {Exclude,classToPlain} from 'class-transformer'

@Entity("users")
export class User extends BaseEntity {

    constructor(user:Partial<User>){
        super()
        Object.assign(this,user)
    }

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

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


    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 6)
    }

    toJSON(){
        return classToPlain(this)
    }
}
