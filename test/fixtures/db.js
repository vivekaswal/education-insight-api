const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User = require('../../src/models/users')
const eduRec=require('../../src/models/education_record')

const userOneId=new mongoose.Types.ObjectId()
const eduRecOneId=new mongoose.Types.ObjectId()

const userOne={
    _id:userOneId,
    name:'Sarhtak',
    email:"sarthak.chaih@gmail.com",
    password:'Sarthak1234',
    tokens:[{
      token: jwt.sign({_id:userOneId},"tokengeneratorstring")
    }]
}

const eduRecOne={
   _id:eduRecOneId,
    name:"sarthak",
    email:"sarthak.chaih@gmail.com",
    state_id:1,
    city_id:1,
    higherstudy_id:1,
    passing_year:new Date(),
    dob:new Date(),  
}

const setupDb= async()=>{
    await User.deleteMany()
    await eduRec.deleteMany()
    await new User(userOne).save()
    await new eduRec(eduRecOne).save()
}

module.exports={
    userOneId,
    userOne,
    setupDb
}
