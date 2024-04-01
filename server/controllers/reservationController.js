import Reservation from "../models/reservationRoomSchema.js";
import Room from '../models/roomSchema.js'

export const createReservation=async(req,res)=>{
  try{
    const {arrivalDate,departureDate,firstLastName,numberOfPersons,email,phoneNumber,additionalInfo,roomId}=req.body;

    const room=await Room.findById(roomId)
    if(!room){
      return res.status(404).json({message:'Room not found'})
    }

    const newReservation=new Reservation({
      arrivalDate,
      departureDate,
      firstLastName,
      numberOfPersons,
      email,
      phoneNumber,
      additionalInfo,
      roomId:room._id
    })

    await newReservation.save();

    res.status(201).json(newReservation)
  }catch(error){
    console.error('Error in createReservation controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const checkAvailability = async (req, res) => {
  try {
    const { arrivalDate, departureDate, roomId } = req.body;

    const existingReservation = await Reservation.findOne({
      roomId: roomId,
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
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'Soba je vec rezervisana za odredjeni datum' });
    }
    res.status(200).json({ available: true });
  } catch (error) {
    console.error('Error in checkAvailability controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const getReservedDatesForRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const reservedDates = await Reservation.find({ roomId }, 'arrivalDate departureDate');
    res.status(200).json({ reservedDates });
  } catch (error) {
    console.error('Error in getReservedDatesForRoom controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.id;
    const reservation = await Reservation.findById(reservationId).populate('roomId');

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error in getReservationById controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReservations=async(req,res)=>{
  try{
    const allReservations=await Reservation.find().populate('roomId')
    res.status(200).json(allReservations)
  }catch(error){
    console.error('Error in getReservations controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}


export const updateReservationProcessedStatus = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    reservation.processed = true;
    await reservation.save();

    res.status(200).json({ message: 'Reservation processed successfully' });
  } catch (error) {
    console.error('Error in updateReservationProcessed controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.id;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    reservation.deleted = true;
    await reservation.save();

    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error in deleteReservation controller:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
