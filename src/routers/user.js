const express=require('express')
const User=require('../models/users')
const router= new express.Router()

router.post('/users', async (req,res)=>{            //creation endpoint  user
  
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