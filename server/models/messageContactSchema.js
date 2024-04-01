import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
  firstLastName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:String,
    required:true
  },
  question:{
    type:String,
    required:true
  },
  deleted:{
    type:Boolean,
    default:false
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => new Date().toLocaleString(),
  }
})

const Message = mongoose.model('Message',messageSchema)

export default Message