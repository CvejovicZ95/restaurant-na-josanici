import express from 'express';
import connect from './db/connectDB.js'
import cors from 'cors';
import dotenv from 'dotenv';

import foodRoutes from './routes/foodRoutes.js'
import wineRoutes from './routes/wineRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
 

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


app.use('/api',adminRoutes)
app.use('/api',foodRoutes)
app.use('/api',wineRoutes)
app.use('/api',roomRoutes)
app.use('/api',messageRoutes)
app.use('/api',reservationRoutes)

app.listen(PORT,()=>{
  connect();
  console.log(`Server is listening on port ${PORT}`)
})