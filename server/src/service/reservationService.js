import { Reservation } from '../models/reservationRoomSchema.js'
import { Room } from '../models/roomSchema.js'
import { logger } from '../../logger.js'

export const createNewReservation = async (arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId) => {
  try {
    const room = await Room.findById(roomId)
    if (!room) {
      throw new Error('Room not found')
    }

    const newReservation = new Reservation({
      arrivalDate,
      departureDate,
      firstLastName,
      numberOfPersons,
      email,
      phoneNumber,
      additionalInfo,
      roomId: room._id
    })

    await newReservation.save()

    logger.info('Reservation created successfully')
    return newReservation
  } catch (error) {
    logger.error('Error creating reservation:', error.message)
    throw new Error('Error creating reservation')
  }
}

export const checkRoomAvailability = async (arrivalDate, departureDate, roomId) => {
  try {
    const existingReservation = await Reservation.findOne({
      roomId,
      $or: [
        {
          arrivalDate: { $lte: arrivalDate },
          departureDate: { $gte: arrivalDate }
        },
        {
          arrivalDate: { $lte: departureDate },
          departureDate: { $gte: departureDate }
        }
      ]
    })
    return !existingReservation
  } catch (error) {
    logger.error('Error checking availability:', error.message)
    throw new Error('Error checking availability')
  }
}

export const getReservedDatesForRooms = async (roomId) => {
  try {
    const reservedDates = await Reservation.find({ roomId }, 'arrivalDate departureDate')
    return reservedDates
  } catch (error) {
    logger.error('Error getting reserved dates for room:', error.message)
    throw new Error('Error getting reserved dates for room')
  }
}

export const findReservationById = async (reservationId) => {
  try {
    const reservation = await Reservation.findById(reservationId).populate('roomId')

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    logger.info('Reservation fetched by ID successfully')
    return reservation
  } catch (error) {
    logger.error('Error getting reservation by id:', error.message)
    throw new Error('Error getting reservation by id')
  }
}

export const getAllReservations = async () => {
  try {
    const allReservations = await Reservation.find().populate('roomId')
    return allReservations
  } catch (error) {
    logger.error('Error getting all reservations:', error.message)
    throw new Error('Error getting all reservations')
  }
}

export const updateReservationProcessedStatusRoom = async (reservationId) => {
  try {
    const reservation = await Reservation.findById(reservationId)

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    reservation.processed = true
    await reservation.save()
    logger.info('Reservation processed status updated successfully')
  } catch (error) {
    logger.error('Error updating reservation processed status:', error.message)
    throw new Error('Error updating reservation processed status')
  }
}

export const deleteReservationById = async (reservationId) => {
  try {
    const reservation = await Reservation.findById(reservationId)

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    reservation.deleted = true
    await reservation.save()
    logger.info('Reservation deleted successfully')
  } catch (error) {
    logger.error('Error deleting reservation:', error.message)
    throw new Error('Error deleting reservation')
  }
}
