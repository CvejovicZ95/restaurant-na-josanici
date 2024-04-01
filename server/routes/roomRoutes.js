import express from 'express'
import { createRoom,getAllRooms,getRoomById, updateRoom } from '../controllers/roomController.js'

const router=express.Router()

router.get('/allRooms',getAllRooms)
router.get('/room/:id',getRoomById)
router.put('/updateRoom/:id',updateRoom)
router.post('/createRoom',createRoom)

export default router