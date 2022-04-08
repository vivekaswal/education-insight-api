const express=require('express')
const eduRecord = require('../models/education_record')
const eduRecord=require('../models/education_record')
const router= new express.Router()

router.post('/education_record', async (req,res)=>{            //user creation endpoint  
  
    const eduRecord=new eduRecord(req.body)
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