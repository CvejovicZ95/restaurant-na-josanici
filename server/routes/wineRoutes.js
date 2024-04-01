import express from 'express'
import { uploadWine,getAllWineGroupedByCategory,deleteWine, updateWine } from '../controllers/wineController.js'

const router=express.Router()

router.post('/uploadWine',uploadWine)
router.put('/updateWine/:id',updateWine)
router.delete('/deleteWine/:id',deleteWine)
router.get('/wine',getAllWineGroupedByCategory)

export default router