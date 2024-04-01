import Room from "../models/roomSchema.js";

export const createRoom=async(req,res)=>{
  try{
    const {name,price,about,imagePath,info}=req.body;

    const newRoom=new Room({
      name,
      price,
      about,
      imagePath,
      info
    })

    await newRoom.save()

    res.status(201).json(newRoom)
  }catch(error){
    console.error('Error in createRoom controller:', error.message);
    res.status(500).json('Server error');
  }
}

export const getAllRooms=async(req,res)=>{
  try{
    const allRooms=await Room.find()
    res.status(200).json(allRooms)
  }catch(error){
    console.log('Error in getAllRoom controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const getRoomById=async(req,res)=>{
  try{
    const room=await Room.findById(req.params.id)
    if(!room){
      return res.status(404).json({error:'Room not found'})
    }
    res.status(200).json(room)
  }catch(error){
    console.log('Error in getRoomById controller', error.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const updateRoom=async(req,res)=>{
  try{
    const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      about:req.body.about,
      price:req.body.price,
      info:req.body.info
    })
    res.status(200).json(updatedRoom)
  }catch(error){
    console.log('Error in updateRoom controller',error.message)
    console.log('Server error')
  }
}

