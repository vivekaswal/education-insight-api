const jwt=require('jsonwebtoken')
const User=require('../models/users')

const auth= async(req,res,next)=>{

    try{
      //   console.log('authentication')
        const token=req.header('Authorization').replace('Bearer ','')
       // console.log(token)
     //   console.log(token)
        
         const decoded=jwt.verify(token,'thisismygenerator')
         //console.log(decoded)

         const user= await User.findOne({_id: decoded._id,'tokens.token':token})
       //  console.log('user '+ user)
         if(!user)
         {
             throw new Error
         }
         req.user=user
         req.token=token
         next()
        }catch(e)
    {
        res.status(401).send({error:'Plaese authenticate.'})
    }
  //  next()
}

module.exports=auth