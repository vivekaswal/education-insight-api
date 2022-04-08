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


module.exports=router

/*
router.delete('/users/me',async(req,res)=>{          //user deletion endpoint 

    try{
        //  const user=await User.findByIdAndDelete(req.user._id)

        //  if(!user)
        //  {
        //      return res.status(404).send()
        //  }
        //  res.send(user)
       await req.user.remove()
        res.send("Deleted")
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

*/