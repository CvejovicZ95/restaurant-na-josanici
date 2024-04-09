import jwt from 'jsonwebtoken';


const generateTokenAndSetCookie=(userId,res)=>{
  const token=jwt.sign({userId},process.env.SECRET_KEY,{
    expiresIn:'1d'
  })

  res.cookie('jwtToken',token,{
    maxAge:24*60*60*1000,
    httpOnly:true,
    sameSite:'none',
   
  });
  return token
}

export default generateTokenAndSetCookie