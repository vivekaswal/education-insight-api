require('./database/dbConnection')
const express=require('express')
const eduRouter=require('./routers/education_record')
const userRouter=require('./routers/user')


const app=express()
app.use(express.json()) // convert request body to json 

const port=process.env.PORT || 3000

app.use(userRouter)
app.use(eduRouter)



app.listen(port, ()=>
{
    console.log('Serevr is running at port :  '+ port)
})

