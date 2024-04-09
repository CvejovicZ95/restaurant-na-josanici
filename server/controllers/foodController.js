import {Food} from "../models/foodSchema.js";
import { addFood, updateFoodById, deleteFoodById } from "../service/foodService.js";
export const getAllFoodGroupedByCategory = async (req, res) => {
  try {
    const allFood = await Food.find();

    const foodByCategory = {};

    allFood.forEach(food => {
      if (!foodByCategory[food.category]) {
        foodByCategory[food.category] = [];
      }
      foodByCategory[food.category].push(food);
    });

    res.status(200).json(foodByCategory);
  } catch (error) {
    console.log('Error in getAllFoodGroupedByCategory controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const uploadFood = async (req, res) => {
  try {
    const { name, about, price, category } = req.body;
    const newFood = await addFood(name, about, price, category);
    res.status(201).json(newFood);
  } catch (error) {
    console.error('Error in uploadFood controller:', error.message);
    res.status(500).json('Server error');
  }
};

export const deleteFood = async (req, res) => {
  try {
    const deletedFood = await deleteFoodById(req.params.id);
    res.status(200).json({ message: 'Food successfully deleted' });
  } catch (error) {
    console.error('Error in deleteFood controller:', error.message);
    res.status(500).json('Server error');
  }
};

export const updateFood = async (req, res) => {
  try {
    const updatedFood = await updateFoodById(req.params.id, req.body);
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error('Error in updateFood controller:', error.message);
    res.status(500).json('Server error');
  }
};
