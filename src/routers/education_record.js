const express=require('express')
const eduRecord = require('../models/education_record')
const router= new express.Router()
const auth=require('../middleware/auth')
const multer=require('multer')
const state_info=require('../models/stateInfo')


const upload=multer({        //working with file to be uploaded :: look multer
    // dest:'avatar',
     limits:{
         fileSize:1000000
     },
     fileFilter(req,file,cb){
 
            if(!file.originalname.match(/\.(pdf)$/))
            {
             return cb(new Error('File must be a pdf'))  
            }
         // cb(new Error('File must be a pdf'))
            cb(undefined,true)
         // cb(undefined,false)
       }
 })
//  router.post('/educationrecords/file',auth, upload.single('filename'),async (req,res)=>{      //upload file
   
//    console.log("inside")
//    console.log(req)
//     // req.edurec.filename=(req.file.buffer)
//     // await req.edurec.save()
//     res.status(200).send()

// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// } )



router.post('/educationrecords',upload.single('filename'), async (req,res)=>{            //education record  creation endpoint  
  
     const eduRec=new eduRecord(JSON.parse(req.body.data))
    eduRec.filename=(req.file.buffer)
   
   try
        {
         await eduRec.save()
         const responseMessage={
            "code": "200",
            "message": " Success"

         }
         res.status(201).send(responseMessage)
        }
    catch (error)
    {
        var err="error generated"
        if(error.keyValue)
        {
            err="email already exist"
        }
        const errorResponse={
            "error_code":400,
            "status":"fail",
            "error_massage":err
        }
        res.status(400).send(errorResponse)
       // res.status(400).send(error)
    }
})

router.delete('/educationrecords/:id',async(req,res)=>{          //edu rec deletion endpoint 
    const rec_id=req.params.id
     try{
          const eduRec=await eduRecord.findByIdAndDelete(rec_id)
          //console.log(eduRec)
           if(!eduRec)    // if user is not in db
           {
            const errorMessage={
                "code":404,
                "status":"failed",
                "message":"Record not available"
            }
               return res.status(404).send(errorMessage)
           }
           const responseMessage={
               "code":200,
               "status":"success",
               "message":"Record successful deleted"
           }
         res.send(responseMessage)
     }
     catch(e)
     {
        const errorMessage={
            "code":500,
            "status":"failed",
            "message":e
        }
         res.status(500).send(errorMessage)
     }
 })
 


 router.get('/educationrecords/:id',async(req,res)=>{          //edurec find endpoint 
  
     const rec_id=req.params.id

   
    try
    {
        

          const eduRec=await eduRecord.findById(rec_id)
        //  console.log(eduRec)
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

 router.put('/educationrecords/:id',async(req,res)=>{           //update endpoint user
    
    const updates=Object.keys(req.body)
    const allowUpdates=['name','email','state_id','city_id','higherstudy_id','passing_year','dob','createdate']
    const isValidOperation= updates.every((update)=>{
          return allowUpdates.includes(update)
    })
    if(!isValidOperation)
    {
          return res.status(400).send({
              error: 'Invlaid update'
          })
    }
   
    try{
    
        const eduRec=await eduRecord.findById(req.params.id)
       
        
        updates.forEach((update)=>{
          
            eduRec[update]=req.body[update]
        })
       
        await eduRec.save()
        //const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
       
        res.send(eduRec)
       }
catch(e)
{
     res.status(400).send(e)
}
})
 router.get('/educationrecords',auth,async(req,res)=>{          //edurec all endpoint 

  console.log("get all")


     try{
         console.log("here")
         
          const eduRec=await eduRecord.find({})
        //  console.log(eduRec)
           if(!eduRec)    // if user is not in db
           {
               return res.status(404).send("No record found")
           }
         res.send(eduRec)
     }
     catch(e)
     {
         res.status(500).send(e)
     }
 })


 router.get('/educationrecords/search/:term',async(req,res)=>{          //edurec find endpoint 
    
    const req_term=req.params.term

  // console.log(req_term)
   try
   {
          
    eduRecord.aggregate([
        {
          $lookup: {
            from: "state_infos",
            localField: "state_id",
            foreignField: "state_id",
            as: "_info",
          },
        },
        {
          $unwind: "$_info",
        },
        {$match: 
            {$or:[
            { "_info.state_name":{ $regex: req_term, $options: 'g' }
            },
            { "email":{$regex: req_term, $options: 'g'}}
        ]   
        }
          },
        
      ])
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
        });

       let check
//        const regex=new RegExp(req_term,'i')
//        const data=await eduRecord.find({ $or: 
//        [
//        { 
//            email: { '$regex': req_term, '$options': 'i' },}
//        ]})
//    //   console.log(data)
//        res.send(data)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

router.get('/educationrecords/file/:id',async (req,res)=>{      //get file
   
    try{
        const rec=await eduRecord.findById(req.params.id)

        if(!rec || !rec.filename)
        {
            throw new Error()
        }
         
        res.set('Content-Type','application/pdf') // what kind of data we are sending back
        res.send(rec.filename)
    }
    catch(e)
    {
        res.status(404).send()
    }
   
})
 


module.exports=router
