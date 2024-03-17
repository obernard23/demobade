const mongoose = require('mongoose')
const { isEmail} = require('validator');

const companyRegisterSchema = new mongoose.Schema({
   
    AnniversiryDate:String,
    email:{
        type:String,
        required:[true,'please entert an Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please eneter a valid Email']
    },
    CompayName:String,
    Address:String,
    Tel:{
        type:String,
        required:[true,'please provide us Your phone Number'],
        unique:true,
    },
    CompanyCity:String,
    CompayState:String,
    CompayZip:String,
    CompayLogo:String,
    
    
},{timestamps:true})

const companyRegister = mongoose.model('companyRegister', companyRegisterSchema)

module.exports = companyRegister