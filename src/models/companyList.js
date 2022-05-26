const mongoose=require('mongoose')

const companyRecord= mongoose.model('companyList',{        //education record schema
    name: {
        type: String,
        unique: false,
        requied: true,
      },
    createddate: {
        type: Date,
        default: Date.now,
    }
})

module.exports=companyRecord
