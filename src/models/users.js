const mongoose=require('mongoose')
const validator=require('validator')
const passwordValidator=require('password-validator')
const jwt=require('jsonwebtoken')

const passwordcheck=new passwordValidator()

passwordcheck
.has().uppercase(1,)
.has().lowercase(1,)
.has().digits()


const userSchema = new mongoose.Schema({       
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
      },
      tokens:[{
        token:{
          type:String,
          requied:true
        }
      }]
})

userSchema.methods.generateAuthToken= async function(){
  console.log("here")
  const user=this
  const token=jwt.sign({_id:user._id.toString()},'thisismygenerator')
  user.tokens=user.tokens.concat({token})
  await user.save()
  console.log(token)
  return token

}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
//  console.log("here")
  if (!user) {
      throw new Error('Unable to login')
  }

  const isMatch =  user.password.localeCompare(password)

  if (isMatch===-1 || isMatch===1 ) {
  //  console.log("in here")
      throw new Error('Unable to login')
  }

  return user
}

const User= mongoose.model('User', userSchema)

module.exports=User
               
