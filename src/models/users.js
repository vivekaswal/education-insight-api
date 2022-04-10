const mongoose=require('mongoose')
const validator=require('validator')
const passwordValidator=require('password-validator')

const passwordcheck=new passwordValidator()

passwordcheck
.has().uppercase(1,)
.has().lowercase(1,)
.has().digits()

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
                
                throw new Error('Invalid Email')
            }
            var len=0
            for(var i=0;i<value.length;i++)
            {
              if(value[i]==='@')
              {
                  break;
              }
              len++
            }
            if(len<5 || len>250)
            {
              throw new Error('Invalid Email')
            }
      }
    },
      password: {
        type: String,
        requied: true,
        minlength:8,
        maxlength:25,
        validate(value){
          if(!passwordcheck.validate(value))
            {
                throw new Error('Invalid Password')
            }
        
      }
    },
      createddate: {
        type: Date,
        default: Date.now,
      }
})


module.exports=User
               
