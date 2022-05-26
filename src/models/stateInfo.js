const mongoose=require('mongoose')

const state_info= mongoose.model('state_info',{        //education record schema
  
   
    state_name: {
        type: String,
        unique: true,
        requied: true,
      },
    state_id: {
        type: Number,
        unique: true,
        requied: true,
      },
   
})



module.exports=state_info

// const sr= new stateIdName(
//     {
//         state_name:"UP",
//         state_id:2

//     }
// )

// console.log("create info")
// sr.save().then(()=>{
// console.log("result",sr)
// }).catch((error)=>{
//     console.log("error",error)
// })


