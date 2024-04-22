import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({
  imagePath: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  overlayText: {
    type: String,
    required: true
  },
  category: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Gallery = mongoose.model('Gallery', gallerySchema)

export { Gallery }
