const mongoose=require('mongoose')
//const uri="mongodb+srv://education_insight:Educationinsight@cluster0.5evzv.mongodb.net/education_insight?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URL,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
  //  useCreateIndex:true,
   // useFindAndModify:false

})




console.log("DB connected")


