import express from 'express'
import { createRoom, getAllRooms, getRoomById, updateRoom } from '../controllers/roomController.js'

export const roomRouter = express.Router()

roomRouter.get('/allRooms', getAllRooms)
roomRouter.get('/room/:id', getRoomById)
roomRouter.put('/updateRoom/:id', updateRoom)
roomRouter.post('/createRoom', createRoom)
