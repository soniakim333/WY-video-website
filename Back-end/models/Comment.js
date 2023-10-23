import mongoose,{Schema} from 'mongoose'

const CommentSchema=new Schema({
    userId:{
        type:String,
        required:true,
    },
    videoId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    /* avatarUrl:{
        type:String,
        required:true
    },
    shared:{
        type:[String],
        default:[]
    },
    likes:{
        type:[String],
        default:[]
    },
    disliked:{
        type:[String],
        default:[]
    }, */
},{timestamps:true})

export default mongoose.model("Comment",CommentSchema)