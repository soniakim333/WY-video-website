import express from 'express'
import { deleteP, dislike, get, like, subscribe, unsubscribe, update } from '../controllers/user.js'
import {verifyToken} from '../verify.js'

const router=express.Router()

router.get("/find/:id",get)
router.put("/:id",verifyToken, update)
router.delete("/:id",verifyToken,deleteP)
router.put("/sub/:id",verifyToken,subscribe)
router.put("/unsub/:id",verifyToken,unsubscribe)
router.put("/like/:videoId",verifyToken,like)
router.put("/dislike/:videoId",verifyToken,dislike)
/* router.put("/share/:interviewId",verifyToken,share)
router.put("/save/:interviewId",verifyToken,save) */

export default router