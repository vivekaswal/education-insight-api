const express=require('express')
const eduRecord = require('../models/education_record')
const router= new express.Router()

router.post('/educationrecords', async (req,res)=>{            //education record  creation endpoint  
  

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

router.delete('/educationrecords/:id',async(req,res)=>{          //edu rec deletion endpoint 
    const rec_id=req.params.id
     try{
          const eduRec=await eduRecord.findByIdAndDelete(rec_id)
          console.log(eduRec)
           if(!eduRec)    // if user is not in db
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
 
 router.get('/education_records/:id',async(req,res)=>{          //edurec find endpoint 
    const rec_id=req.params.id
     try{
         console.log("here")
          const eduRec=await eduRecord.findById(rec_id)
          console.log(eduRec)
           if(!eduRec)    // if user is not in db
           {
               return res.status(404).send("user not found")
           }
         res.send(eduRec)
     }
     catch(e)
     {
         res.status(500).send(e)
     }
 })

module.exports=router