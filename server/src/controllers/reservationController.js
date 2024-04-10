import { createNewReservation, checkRoomAvailability, getReservedDatesForRooms, findReservationById, getAllReservations, updateReservationProcessedStatusRoom, deleteReservationById } from "../service/reservationService.js";

export const createReservation = async (req, res) => {
  try {
    const { arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId } = req.body;

    const newReservation = await createNewReservation(arrivalDate, departureDate, firstLastName, numberOfPersons, email, phoneNumber, additionalInfo, roomId);
    
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error in createReservation controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { arrivalDate, departureDate, roomId } = req.body;
    const available = await checkRoomAvailability(arrivalDate, departureDate, roomId);
    res.status(200).json({ available });
  } catch (error) {
    console.error('Error in checkAvailability controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReservedDatesForRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const reservedDates = await getReservedDatesForRooms(roomId);
    res.status(200).json({ reservedDates });
  } catch (error) {
    console.error('Error in getReservedDatesForRoom controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await findReservationById(reservationId);
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error in getReservationById controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReservations = async (req, res) => {
  try {
    const allReservations = await getAllReservations();
    res.status(200).json(allReservations);
  } catch (error) {
    console.error('Error in getReservations controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateReservationProcessedStatus = async (req, res) => {
  try {
    const reservationId = req.params.id;
    await updateReservationProcessedStatusRoom(reservationId);
    res.status(200).json({ message: 'Reservation processed successfully' });
  } catch (error) {
    console.error('Error in updateReservationProcessedStatus controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;
    await deleteReservationById(reservationId);
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error in deleteReservation controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};