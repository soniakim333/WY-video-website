import express from 'express'
import { addComment, deleteComment, getComment } from '../controllers/comments.js'
import { verifyToken } from '../verify.js'

const router=express.Router()

router.post('/',verifyToken,addComment)
router.put('/:id',verifyToken,deleteComment)
router.get('/:videoId',getComment)

export default router