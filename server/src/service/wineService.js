import { Wine } from '../models/wineSchema.js'
import { logger } from '../../logger.js'

export const addWine = async (name, about, price, category) => {
  try {
    const newWine = new Wine({ name, about, price, category })
    await newWine.save()
    logger.info('Wine added successfully:', newWine.name)
    return newWine
  } catch (error) {
    logger.error('Error adding wine:', error.message)
    throw new Error('Error adding wine')
  }
}

export const deleteWineById = async (wineId) => {
  try {
    const deletedWine = await Wine.findByIdAndDelete(wineId)
    if (!deletedWine) {
      throw new Error('Wine not found')
    }
    return deletedWine
  } catch (error) {
    logger.info('Wine deleted successfully:')
    throw new Error('Error deleting wine')
  }
}

export const updateWineById = async (wineId, newData) => {
  try {
    const updatedWine = await Wine.findByIdAndUpdate(wineId, newData, { new: true })
    if (!updatedWine) {
      throw new Error('Wine not found')
    }
    logger.info('Wine updated successfully:', updatedWine.name)
    return updatedWine
  } catch (error) {
    logger.error('Error updating wine:', error.message)
    throw new Error('Error updating wine')
  }
}
