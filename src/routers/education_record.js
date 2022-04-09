const express=require('express')
const eduRecord = require('../models/education_record')
const router= new express.Router()

router.post('/educationrecord', async (req,res)=>{            //education record  creation endpoint  
  

    const eduRec=new eduRecord(req.body)
   // console.log(req.body)
    try
        {
         await eduRec.save()
         res.status(201).send("success")
        }
    catch (error)
    {
        res.status(400).send(error)
    }
})

module.exports=router