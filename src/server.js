require('./database/dbConnection')
const express=require('express')

const userRouter=require('./routers/user')


const app=express()
app.use(express.json()) // convert request body to json 

const port=process.env.PORT

app.use(userRouter)

// comment for

app.listen(port, ()=>
{
    console.log('Serevr is running at port :  '+ port)
})

