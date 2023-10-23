import express from 'express'
import { addVideo, deleteVideo, getVideo, random, search, sub, tags, trend, updateVideo, views } from '../controllers/video.js'
import { verifyToken } from '../verify.js'

const router=express.Router()

router.post('/',verifyToken,addVideo)
router.put('/:id',verifyToken,updateVideo)
router.delete('/:id',verifyToken,deleteVideo)
router.get('/find/:id',verifyToken,getVideo)
router.put('/views/:id',verifyToken,views)
router.get('/trend',trend)
router.get('/random',random)
router.get('/sub',verifyToken,sub)
router.get('/tags',tags)
router.get('/search',search)

export default router