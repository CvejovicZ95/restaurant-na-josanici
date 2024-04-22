import express from 'express'
import { createReservation, checkAvailability, getReservedDatesForRoom, getReservationById, getReservations, updateReservationProcessedStatus, deleteReservation } from '../controllers/reservationController.js'

export const reservationRouter = express.Router()

reservationRouter.get('/reservations', getReservations)
reservationRouter.post('/checkAvailability', checkAvailability)
reservationRouter.post('/createReservation', createReservation)
reservationRouter.get('/getReservedDates/:id', getReservedDatesForRoom)
reservationRouter.get('/reservation/:id', getReservationById)
reservationRouter.put('/reservation/:id/processed', updateReservationProcessedStatus)
reservationRouter.put('/deleteReservation/:id', deleteReservation)
