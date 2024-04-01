import express from 'express'
import { createMessage, deleteMessage, getMessages } from '../controllers/messageController.js'

const router=express.Router()

router.post('/createMessage',createMessage)
router.get('/allMessages',getMessages)
router.put('/deleteMessage/:id',deleteMessage)

export default router