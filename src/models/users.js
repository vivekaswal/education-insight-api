const mongoose=require('mongoose')

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
               
