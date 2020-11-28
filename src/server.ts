import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import trim from "./middleware/trim";
import userRouter from './routes/user'

dotenv.config()

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.use('/api/user',userRouter)

app.get('/',(req,res) => res.send("Hello world!"))


app.listen(5000,async() => {
    console.log('Server running at http://localhost:5000')

    try {
        await createConnection()
        console.log("Database Connected !"); 
    } catch (err) {
        console.log(err)
    }
})




