import { Post } from './Post';
import { User } from './User';
import {Entity as TOEntity, Column,Index, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import {Exclude} from 'class-transformer'
import Entity from './Entity'

@TOEntity("subs")
export class Sub extends Entity {

    constructor(sub:Partial<Sub>){
        super()
        Object.assign(this,sub)
    }
    @Index()
    @Column({unique:true})
    name: string

    @Column()
    title: string

    @Column({type:'text',nullable: true})
    description: string

    @Column({nullable: true})
    imageUrn: string

    @Column({nullable: true})
    bannerUrn:string

    @ManyToOne(() => User)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user:User

    @OneToMany(() => Post, post => post.subName)
    posts:[Post]
}
