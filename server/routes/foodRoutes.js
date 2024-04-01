import express from 'express'
import { uploadFood,getAllFoodGroupedByCategory,deleteFood, updateFood } from '../controllers/foodController.js'

const router=express.Router()

router.post('/uploadFood',uploadFood)
router.put('/updateFood/:id',updateFood)
router.delete('/deleteFood/:id',deleteFood)
router.get('/menu',getAllFoodGroupedByCategory)

export default router