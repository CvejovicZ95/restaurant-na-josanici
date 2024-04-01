import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
  
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString(),
  }
})

const Admin = mongoose.model('Admin',adminSchema)

export default Admin