import Admin from "../models/adminSchema.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register=async(req,res)=>{
  try{
    const {username,password}=req.body;

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const newAdmin= new Admin({
      username,
      password:hashedPassword
    })

    if(newAdmin){
      await newAdmin.save()
    }

    res.status(201).json(newAdmin)
  }catch(error){
    console.log('Error in adminController controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export const login = async(req,res)=>{
  try{
    const {username,password}=req.body;
    const admin=await Admin.findOne({username})

    const isPassCorrect=await bcrypt.compare(password,admin?.password || '')

    if(!admin || !isPassCorrect){
      return res.status(400).json({error:'Pogresno korisnicko ime ili lozinka'})
    }

    const token=generateTokenAndSetCookie(admin._id,res)

    res.status(200).json({
      token:token,
      _id:admin._id,
      username:admin.username
    })
  }catch(error){
    console.log('Error in loginAdmin controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export const logout=async(req,res)=>{
  try{
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({message:'Izlogovani ste'})
  }catch(error){
    console.log('Error in logoutAdmin controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}