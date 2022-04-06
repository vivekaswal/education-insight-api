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
        type: Number,
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