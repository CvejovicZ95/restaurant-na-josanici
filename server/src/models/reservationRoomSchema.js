import mongoose from 'mongoose'

const reservatationSchema = new mongoose.Schema({
  arrivalDate: {
    type: String,
    required: true
  },
  departureDate: {
    type: String,
    required: true
  },
  firstLastName: {
    type: String,
    required: true
  },
  numberOfPersons: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Room'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  processed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString()
  }
})

const Reservation = mongoose.model('Reservation', reservatationSchema)

export { Reservation }
