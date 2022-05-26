require('./database/dbConnection')
const express=require('express')


const userRouter=require('./routers/user')
const eduRouter=require('./routers/education_record')

const app=express()
app.use(express.json()) // convert request body to json 



app.use(userRouter)
app.use(eduRouter)

module.exports=app