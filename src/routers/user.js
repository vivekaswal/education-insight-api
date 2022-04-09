const express=require('express')
const User=require('../models/users')
const router= new express.Router()

router.post('/users', async (req,res)=>{            //user creation endpoint  
  
    const user=new User(req.body)
   // console.log(req.body)
    try
        {
         await user.save()
         res.status(201).send("success")
        }
    catch (error)
    {
        res.status(400).send(error)
    }
})


router.delete('/users/:id',async(req,res)=>{          //user deletion endpoint 
   const user_id=req.params.id
    try{
         const user=await User.findByIdAndDelete(user_id)
         console.log(user)
          if(!user)    // if user is not in db
          {
              return res.status(404).send("user not found")
          }
        res.send("Deleted")
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})


module.exports=router



