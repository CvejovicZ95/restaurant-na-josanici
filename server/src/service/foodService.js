import { Food } from '../models/foodSchema.js'
import { logger } from '../../logger.js'

export const addFood = async (name, about, price, category) => {
  try {
    const newFood = new Food({ name, about, price, category })
    await newFood.save()

    logger.info('Food added successfully')
    return newFood
  } catch (error) {
    logger.error('Error adding food:', error.message)
    throw new Error('Error adding food')
  }
}

export const deleteFoodById = async (foodId) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(foodId)
    if (!deletedFood) {
      throw new Error('Food not found')
    }
    logger.info('Food deleted successfully')
    return deletedFood
  } catch (error) {
    logger.error('Error deleting food:', error.message)
    throw new Error('Error deleting food')
  }
}

export const updateFoodById = async (foodId, newData) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(foodId, newData, { new: true })
    if (!updatedFood) {
      throw new Error('Food not found')
    }
    logger.info('Food updated successfully')
    return updatedFood
  } catch (error) {
    logger.error('Error updating food:', error.message)
    throw new Error('Error updating food')
  }
}
