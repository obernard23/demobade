const mongoose = require('mongoose')

const Scrap = new mongoose.Schema ( {  

    storeProductId:{
        type:mongoose.Types.ObjectId,
        ref:'storeProduct'
    },
    ActivityLog:Array,
    Attachment1:String,
    Attachment2:String,
    ADC_CODE:String,
    status:{
        type:String,
        default:"pending"
    },
    REASON:String,
    remarks:String,
    WHID:{
        type:mongoose.Types.ObjectId,
        ref:'WHouse'
    },
    wareHouse:String,
    mailSent:{
        default:false,
        type:Boolean,
    },
    SERIALnUMBER:{
        type:String,
    }
},{timestamps:true})

const WHScrap = mongoose.model('Scrap', Scrap);

 module.exports = WHScrap