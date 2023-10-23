import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'


const app=express()

try {
    mongoose.connect('mongodb://127.0.0.1:27017/publisher');
} catch (error) {
    throw error
}

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRoutes)

app.use('/api/users',userRoutes)
app.use('/api/comments',commentRoutes)
app.use('/api/videos',videoRoutes)

app.use((err,req,res,next)=>{
    const status=err.status||500
    const message=err.message||"There is something wrong..."

    res.status(status).json({
        success:false,
        status,
        message
    })
})
app.listen(8000,()=>{

    console.log("http://127.0.0.1:8000 is on use.");
})