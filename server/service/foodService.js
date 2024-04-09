import { Food } from "../models/foodSchema.js";

export const addFood = async (name, about, price, category) => {
  try {
    const newFood = new Food({ name, about, price, category });
    await newFood.save();
    return newFood;
  } catch (error) {
    throw new Error('Error adding food');
  }
};

export const deleteFoodById = async (foodId) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(foodId);
    if (!deletedFood) {
      throw new Error('Food not found');
    }
    return deletedFood;
  } catch (error) {
    throw new Error('Error deleting food');
  }
};

export const updateFoodById = async (foodId, newData) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(foodId, newData, { new: true });
    if (!updatedFood) {
      throw new Error('Food not found');
    }
    return updatedFood;
  } catch (error) {
    throw new Error('Error updating food');
  }
};