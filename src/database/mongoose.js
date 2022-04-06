const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/education_insight',{
    useNewUrlParser:true,
  //  useCreateIndex:true,
   // useFindAndModify:false

})




console.log("DB connected")



