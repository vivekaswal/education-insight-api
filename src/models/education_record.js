const mongoose=require('mongoose')

const eduRecord= mongoose.model('education_record',{        //education record schema
    name: {
        type: String,
        unique: false,
        requied: true,
      },
    email: {
        type: String,
        unique: true,
        requied: true,
      },
    state_id: {
        type: Number,
        requied: true,
    },
    city_id: {
        type: Number,
        requied: true,
    },
    higherstudy_id: {
        type: Number,
        requied: true,
    },  
    passing_year: {
        type: Date,
        requied: true,
    },   
    dob: {
        type: Date,
        
    },
    createddate: {
        type: Date,
        default: Date.now,
    }
})

module.exports=eduRecord
/*
console.log("creating edu record")
const er= new eduRecord(
    {
        name:"sarthak",
        email:'sat@gmail.c',
        state_id:2,
        city_id:3,
        higherstudy_id:2,
        passing_year:'1997-12-12',
        dob:'1997-02-03'

    }
)

er.save().then(()=>{
console.log("result",er)
}).catch((error)=>{
    console.log("error",error)
})
*/

