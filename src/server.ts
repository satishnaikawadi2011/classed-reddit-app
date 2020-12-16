import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import trim from "./middleware/trim";
import userRouter from './routes/user'
import postRouter from './routes/post'
import subRouter from './routes/subs'

dotenv.config()

const app = express();

app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN,
    optionsSuccessStatus:200,
}))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use('/api/sub',subRouter)

app.get('/',(req,res) => res.send("Hello world!"))

const PORT = process.env.PORT 
app.listen(PORT,async() => {
    console.log(`Server running at http://localhost:${PORT}`)

    try {
        await createConnection()
        console.log("Database Connected !"); 
    } catch (err) {
        console.log(err)
    }
})




