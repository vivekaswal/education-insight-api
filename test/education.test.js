const request=require('supertest')
const app=require('../src/app')
const eduRec=require('../src/models/education_record')

const {userOneId ,userOne,setupDb}=require('./fixtures/db')

beforeEach(setupDb)

test('create education record',async()=>{
    const response=await request(app).post('/educationrecords').field('text',{"fullname": "samarth",
    "email": "sarthak.chauhan@gmal.com",
    "state_id": "1",
    "city_id": "5",
    "higherstudy_id": "2",
    "passing_year": "2020",
    "dob": "05-07-1990"
  }).attach('filename','test/fixtures/resume.pdf').expect(200)
}
)
