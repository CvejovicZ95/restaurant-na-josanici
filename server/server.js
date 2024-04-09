import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import {connect} from './db/connectDB.js'

import {foodRouter} from './routes/foodRoutes.js'
import {wineRouter} from './routes/wineRoutes.js'
import {roomRouter} from './routes/roomRoutes.js'
import {messageRouter} from './routes/messageRoutes.js'
import {reservationRouter} from './routes/reservationRoutes.js'
import {adminRouter} from './routes/adminRoutes.js'
 

const app=express();
dotenv.config();

const PORT = process.env.PORT || 5000;

const corsOptions={
  origin: ['http://localhost:3000','http://192.168.1.6:3000'],
  optionsSuccessStatus:200,
  credentials: true
};


app.use(express.json());
app.use(cors(corsOptions));


app.use('/api',adminRouter)
app.use('/api',foodRouter)
app.use('/api',wineRouter)
app.use('/api',roomRouter)
app.use('/api',messageRouter)
app.use('/api',reservationRouter)

app.listen(PORT,()=>{
  connect();
  console.log(`Server is listening on port ${PORT}`)
})