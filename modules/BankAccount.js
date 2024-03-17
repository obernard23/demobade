const mongoose = require('mongoose')

const bankAccountSchema = new mongoose.Schema( {  

    NAME:{
        type:String,
        required:true
    },
    AccountNum:{
        required:true,
        type:String,
        unique:true,
    },
    inactive:{
        default:false,
        type:Boolean,
    },
    Balance:{
        type:Number,
        default:0,
    },
    AccountType:{
        required:true,
        type:String,
    },
    logo:String,
    bankName:String,
    bankCode:String,
    locationOfUse:{
        type:mongoose.Types.ObjectId,
        ref:'whouses',
        required:true,
    },
   
},{timestamps:true})

const bankAccount = mongoose.model('Account', bankAccountSchema);

module.exports = bankAccount