import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import userRoutes from './routes/userRoutes.js'

const app=express()
app.use(express.json())
app.use(cors())

connectDB()



app.get('/',(req,res)=>{
    res.send("hello there, backend is fine and running")
})


app.use('/api',userRoutes)

app.use('/api',userRoutes)


const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Listining on port ${port}`)
})