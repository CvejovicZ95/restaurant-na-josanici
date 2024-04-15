import express from 'express'
import { uploadFood,getAllFoodGroupedByCategory,deleteFood, updateFood } from '../controllers/foodController.js'

export const foodRouter=express.Router()

foodRouter.post('/uploadFood',uploadFood)
foodRouter.put('/updateFood/:id',updateFood)
foodRouter.delete('/deleteFood/:id',deleteFood)
foodRouter.get('/menu',getAllFoodGroupedByCategory)
