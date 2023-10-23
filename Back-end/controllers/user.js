import { errorMsg } from "../error.js"
import Video from "../models/Video.js"
import User from "../models/User.js"

export const get=async (req,res,next)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user) return next(errorMsg(403,"there is no such user"))

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}
export const update=async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            const updateUser=await User.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            )

            res.status(200).json(updateUser)
        } catch (error) {
            next(error)
        }

    }else{
        return next(errorMsg(403,"Please justify your own information."))
    }
}
export const deleteP=async (req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted the user.")
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorMsg(403,"Please delete your own information."))
    }
}
export const subscribe=async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })
        res.status(200).json("Subscription done")
    } catch (error) {
        next(error)
    }
}
export const unsubscribe=async (req,res,next)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })
        res.status(200).json("Unsubscription done")
    } catch (error) {
        next(error)
    }
}
export const like=async (req,res,next)=>{
    const id=req.user.id
    const videoId=req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json('One cute person like your video!')
    } catch (error) {
        next(error)
    }
}
export const dislike=async (req,res,next)=>{
    const id=req.user.id
    const videoId=req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json('One dislike you but fighting!')
    } catch (error) {
        next(error)
    }
}

/* export const share=async (req,res,next)=>{
    const id=req.publisher.id
    const interviewId=req.publisher.interviewId
    try {
        await Interviews.findByIdAndUpdate(interviewId,{
            $addToSet:{shared:id}
        })
        res.status(200).json('One cute person shared your interview!')
    } catch (error) {
        next(error)
    }
}
export const save=async (req,res,next)=>{
    const id=req.publisher.id
    const interviewId=req.publisher.interviewId
    try {
        await Interviews.findByIdAndUpdate(interviewId,{
            $addToSet:{saved:id}
        })
        res.status(200).json('One cute person saved your interview!')
    } catch (error) {
        next(error)
    }
} */
