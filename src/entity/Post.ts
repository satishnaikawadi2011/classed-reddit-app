import { Sub } from './Sub';
import { User } from './User';
import {Entity as TOEntity, Column,Index,BeforeInsert, ManyToOne, JoinTable, JoinColumn, OneToMany} from "typeorm";
import {Exclude} from 'class-transformer'
import Entity from './Entity'
import makeId from '../utils/makeId';
import string_to_slug from '../utils/slugify'
import { Comment } from './Comment';

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

    @ManyToOne(() => User,user => user.posts)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user:User

    @ManyToOne(() => Sub,sub => sub.posts)
    @JoinColumn({name:'subName',referencedColumnName:'name'})
    sub:Sub

    @OneToMany(() => Comment,comment => comment.post)
    comments:Comment[]

    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier = makeId(7)
        this.slug = string_to_slug(this.title)
    }
}
