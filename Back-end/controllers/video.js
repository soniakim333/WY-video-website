import { errorMsg } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const addVideo=async (req,res,next)=>{
    const newVideo=new Video({userId: req.user.id,...req.body})

    try {
        const saveVideo=await newVideo.save()
        res.status(200).json(saveVideo)
    } catch (error) {
        next(error)
    }
}

export const updateVideo=async (req,res,next)=>{
    try {
        const video=await Video.findById(req.params.id)
        if(!video) return next(errorMsg(404,"No such file exists"))

        if(req.user.id===video.userId){
            const updateVideo=await Video.findByIdAndUpdate(
                req.params.id,{
                    $set:req.body
                },{
                    new:true}
            )
            res.status(200).json(updateVideo)
        }else{
            return next(errorMsg(403,"You can only get access to your own video"))
        }
    } catch (error) {
        next(error)
    }
}

export const deleteVideo=async (req,res,next)=>{
    try {
        const video=await Video.findById(req.params.id)
        if(!video) return next(errorMsg(404,"No such file exists"))

        if(req.user.id===video.userId){
            await Video.findByIdAndDelete(
                req.params.id)
            res.status(200).json("The video has been deleted")
        }else{
            return next(errorMsg(403,"You can only get access to your own video."))
        }
    } catch (error) {
        next(error)
    }
}

export const getVideo=async (req,res,next)=>{
    try {
        const video=await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }
}

export const views=async (req,res,next)=>{
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        res.status(200).json("One more loves your video, yeah!")
    } catch (error) {
        next(error)
    }
}

export const trend=async (req,res,next)=>{
    try {
        const videos=await Video.find().sort({views:-1})
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const random=async (req,res,next)=>{
    try {
        const videos=await Video.aggregate([{$sample:{size:40}}])
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const sub=async (req,res,next)=>{
    try {
        const user=await User.findById(req.user.id)
        const subscribedChannels=user.subscribedUsers

        const list=await Promise.all(
            subscribedChannels.map((channelId)=>{
                return Video.find({userId: channelId})
            })
        )
        res.status(200).json(list.flat().sort((a,b)=>b.createdAt-a.createdAt))
    } catch (error) {
        next(error)
    }
}

export const tags=async (req,res,next)=>{
    const tags=req.query.tags.split(",")
    try {
        const videos=await Video.find({tags: {$in:tags}}).limit(20)
        
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const search=async (req,res,next)=>{
    const searches=req.query.search
   
    try {
       const videos=await Video.find({
            title:{
                $regex:searches,
                $options:"i"
            }}).limit(40)

       res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

