const mongoose=require('mongoose')
const statei_nfo=require('../models/stateInfo')
const eduRecord = require('../models/education_record')
const express=require('express')

mongoose.Promise = global.Promise
//const uri="mongodb+srv://education_insight:Educationinsight@cluster0.5evzv.mongodb.net/education_insight?retryWrites=true&w=majority"
const uri="mongodb://127.0.0.1:27017/education_insight-api-test"
mongoose.connect(uri,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
  //  useCreateIndex:true,
   // useFindAndModify:false

})




console.log("DB connected")



