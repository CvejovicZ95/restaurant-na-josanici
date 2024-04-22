import express from 'express'
import { createMessage, deleteMessage, getMessages } from '../controllers/messageController.js'

const messageRouter = express.Router()

messageRouter.post('/createMessage', createMessage)
messageRouter.get('/allMessages', getMessages)
messageRouter.put('/deleteMessage/:id', deleteMessage)

export { messageRouter }
