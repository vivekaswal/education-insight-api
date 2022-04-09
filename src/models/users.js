const mongoose=require('mongoose')
const validator=require('validator')

const User= mongoose.model('users',{       //users schema
    fullname: {
        type: String,
        unique: false,
        requied: true,
      },
      email: {
        type: String,
        unique: true,
        requied: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid')
            }
      }
    },
      password: {
        type: String,
        requied: true,
      },
      createddate: {
        type: Date,
        default: Date.now,
      }
})

module.exports=User
               
