import express from 'express'
import { uploadWine, getAllWineGroupedByCategory, deleteWine, updateWine } from '../controllers/wineController.js'

const wineRouter = express.Router()

wineRouter.post('/uploadWine', uploadWine)
wineRouter.put('/updateWine/:id', updateWine)
wineRouter.delete('/deleteWine/:id', deleteWine)
wineRouter.get('/wine', getAllWineGroupedByCategory)

export { wineRouter }
