const request=require('supertest')
const app=require('../src/app')
const User=require('../src/models/users')



const {userOneId ,userOne,setupDb}=require('./fixtures/db')

beforeEach(setupDb)


test('Sign up user',async()=>{
    const response=await request(app).post('/users').send({
        name:'sarthak',
        email:'sarthak.chauhan@gmail.com',
        password:'Mypass888'
    }).expect(201)

    const user=await User.findById(response.body.data[0].key)
    expect(user).not.toBeNull()
})

test('Login user',async()=>{
    await request(app).post('/signin').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    
})

test('Login fail  user',async()=>{
    await request(app).post('/signin').send({
        email:userOne.email,
        password:"Thisisnotpassword"
    }).expect(400)
    
})