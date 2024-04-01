import mongoose from "mongoose";

const wineSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  about:{
    type:String,
    required:false
  },
  category:{
    type:String,
    required:true
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString(),
  }
})

const Wine = mongoose.model('Wine',wineSchema)

export default Wine