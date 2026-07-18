import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import './config/firebase.js'
import dotenv from "dotenv";

dotenv.config();
const app=express()
app.use(express.json())
app.use(cors())

connectDB()



app.get('/',(req,res)=>{
    res.status(200).send("hello there, backend is fine and running")
})


app.use('/api',userRoutes)
app.use('/api',imageRoutes)



const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listining on port ${port}`)
})