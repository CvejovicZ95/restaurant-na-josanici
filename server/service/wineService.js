// wineService.js

import { Wine } from "../models/wineSchema.js";

export const addWine = async (name, about, price, category) => {
  try {
    const newWine = new Wine({ name, about, price, category });
    await newWine.save();
    return newWine;
  } catch (error) {
    throw new Error('Error adding wine');
  }
};

export const deleteWineById = async (wineId) => {
  try {
    const deletedWine = await Wine.findByIdAndDelete(wineId);
    if (!deletedWine) {
      throw new Error('Wine not found');
    }
    return deletedWine;
  } catch (error) {
    throw new Error('Error deleting wine');
  }
};

export const updateWineById = async (wineId, newData) => {
  try {
    const updatedWine = await Wine.findByIdAndUpdate(wineId, newData, { new: true });
    if (!updatedWine) {
      throw new Error('Wine not found');
    }
    return updatedWine;
  } catch (error) {
    throw new Error('Error updating wine');
  }
};
