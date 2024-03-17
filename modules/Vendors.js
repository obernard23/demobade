const mongoose = require('mongoose');
const { isEmail} = require('validator');

const VendorSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Provide a Product Name'],
        unique: true
    },
    Address:{
        type:String,
    },
    image:{
        type:String,
    },
    vendor_tel:{
        type:String,
    },
    email:{
        type:String,
        unique: true,
        validate:[isEmail,'please eneter a valid Email']
    },
    Categories:{
        type:String
    },
    ActivityLog:{
        type:Array
    },
    block_vendor:{
        type:Boolean,
        default:true,
    },
    Account_num:{
        type:String,
    },
    Account_name:{
        type:String
    },
    Bank_name:{
        type:String
    },
    Balance:{
        type:Number,
        defauit:0
    }

},{timestamps:true})

const  Vendor = mongoose.model(' Vendor',VendorSchema);

module.exports = Vendor