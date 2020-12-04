import {Entity as TOEntity, Column,Index,BeforeInsert} from "typeorm";
import {Exclude} from 'class-transformer'
import Entity from './Entity'

@TOEntity("posts")
export class Post extends Entity {

    constructor(post:Partial<Post>){
        super()
        Object.assign(this,post)
    }
    @Index()
    @Column()
    identifier: string

    @Column()
    title: string

    @Index()
    @Column()
    slug: string

    @Column({nullable:true})
    body:string

    @Column()
    subName:string
}
