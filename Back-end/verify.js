import jwt from 'jsonwebtoken'
import { errorMsg } from './error.js'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token) return next(errorMsg(401,"Wrong authentication."))

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(errorMsg(403,"token is invalid."))

        req.user=user
        next()
    })
}