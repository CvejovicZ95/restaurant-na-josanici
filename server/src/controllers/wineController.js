import {Wine} from "../models/wineSchema.js";
import { addWine, deleteWineById, updateWineById } from "../service/wineService.js";
import { logger } from "../../logger.js";

export const getAllWineGroupedByCategory = async (req, res) => {
  try {
    const allWine = await Wine.find();

    const wineByCategory = {};

    allWine.forEach(wine => {
      if (!wineByCategory[wine.category]) {
        wineByCategory[wine.category] = [];
      }
      wineByCategory[wine.category].push(wine);
    });
    res.status(200).json(wineByCategory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const uploadWine = async (req, res) => {
  try {
    const { name, about, price, category } = req.body;
    const newWine = await addWine(name, about, price, category);
    res.status(201).json(newWine);
  } catch (error) {
    res.status(500).json('Server error');
  }
};

export const deleteWine = async (req, res) => {
  try {
    const deletedWine = await deleteWineById(req.params.id);
    res.status(200).json({ message: 'Wine successfully deleted' });
  } catch (error) {
    res.status(500).json('Server error');
  }
};

export const updateWine = async (req, res) => {
  try {
    const updatedWine = await updateWineById(req.params.id, req.body);
    res.status(200).json(updatedWine);
  } catch (error) {
    res.status(500).json('Server error');
  }
};