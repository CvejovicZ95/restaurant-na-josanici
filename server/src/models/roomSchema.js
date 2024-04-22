import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Room = mongoose.model('Room', roomSchema)

export { Room }
