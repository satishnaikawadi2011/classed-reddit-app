import { Post } from './Post';
import { Sub } from './Sub';
import { User } from './User';
import {Entity as TOEntity, Column,Index,BeforeInsert, ManyToOne, JoinTable, JoinColumn} from "typeorm";
import Entity from './Entity'
import makeId from '../utils/makeId';

@TOEntity("comments")
export class Comment extends Entity {

    constructor(comment:Partial<Comment>){
        super()
        Object.assign(this,comment)
    }
    @Index()
    @Column()
    identifier: string

    @Column({nullable:true})
    body:string

    @Column()
    username:string

    @ManyToOne(() => User)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user:User

    @ManyToOne(() => Post,post => post.comments,{nullable:false})
    post:Post

    @BeforeInsert()
    makeIdentifier(){
        this.identifier = makeId(8)
    }
}
