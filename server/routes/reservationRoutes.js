import express from 'express'
import { createReservation,checkAvailability,getReservedDatesForRoom,getReservationById, getReservations,updateReservationProcessedStatus, deleteReservation } from '../controllers/reservationController.js'
import authenticateToken from '../middleware/authAdmin.js';

const router=express.Router()

router.get('/reservations',getReservations)
router.post('/checkAvailability',checkAvailability)
router.post('/createReservation',createReservation)
router.get('/getReservedDates/:id',getReservedDatesForRoom)
router.get('/reservation/:id',getReservationById)
router.put('/reservation/:id/processed',updateReservationProcessedStatus)
router.put('/deleteReservation/:id',deleteReservation)

export default router