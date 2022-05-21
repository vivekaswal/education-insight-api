const app=require('./app')

const port=process.env.PORT || 3000

<<<<<<< HEAD
=======
app.use(userRouter)
app.use(eduRouter)

// comment for

>>>>>>> e465b006fcaff8a5380a8d6e015cfeafc8958f01
app.listen(port, ()=>
{
    console.log('Serevr is running at port :  '+ port)
})

