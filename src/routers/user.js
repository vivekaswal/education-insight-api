const express=require('express')
const User=require('../models/users')
const router= new express.Router()

router.post('/users', async (req,res)=>{            //user creation endpoint  
  
    const user=new User(req.body)
   // console.log(req.body)
    try
        {
         await user.save()
         
         const responseMessage={
             "code":200,
             "status":"success",
             "data":[
                 {
                     "key":user._id
                 }
             ]
         }
         
         res.status(201).send(responseMessage)
        }
    catch (error)
    {
       // console.log(error)
       
        var err
        if(error.keyValue)
        {
            err="user exist"
        }
        else if(error.errors && error.errors.password)
        {
          err="Invalid Password"
        }
        else if(error.errors && error.errors.email)
        {
            err="Invalid Email"
        }
        const errorResponse={
            "error_code":400,
            "status":"fail",
            "error_massage":err
        }
        res.status(400).send(errorResponse)
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



