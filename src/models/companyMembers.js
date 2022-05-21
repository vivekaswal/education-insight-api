const mongoose=require('mongoose')

const companyMemberRecord= mongoose.model('companyMembers',{        //education record schema
    name: {
        type: String,
        unique: false,
        requied: true,
      },
    createddate: {
        type: Date,
        default: Date.now,
    },
    employer:{
        type:mongoose.Schema.Types.ObjectId,
        requied:true
    }
})

module.exports=companyMemberRecord
