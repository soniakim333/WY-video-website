import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import User from '../models/User.js'
import { errorMsg } from '../error.js';


dotenv.config()

export const signup=async (req,res,next)=>{
    try {
        const salt=bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser=new User({...req.body,password:hash})
        
        await newUser.save()
        res.status(200).send('One newUser have been created')
    } catch (error) {
        next(error)
    }
}

export const signin=async (req,res,next)=>{
    try {
        const user=await User.findOne({name:req.body.name})
        if(!user) return next(errorMsg(404,"User not found"))
       
        const isCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isCorrect) return next(errorMsg(400,"Wrong Credentials"))

        const {password,...others}=user._doc
        const token=jwt.sign({id:user._id},process.env.JWT)
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(others)
    } catch (error) {
        next(error)
    }
}

export const google=async (req,res,next)=>{
    try {
        const user=await User.findOne({email:req.body.email})
      
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT)
            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200).json(user._doc)
        }else{
            const newUser=new User({
                ...req.body,
                fromGoogle:true
            })
            const saveUser=await newUser.save()

            const token=jwt.sign({id:saveUser._id},process.env.JWT)
            res.cookie("access_token",token,{
                httpOnly:true
            }).status(200).json(saveUser._doc)
        }
    } catch (error) {
        next(error)
    }
}

