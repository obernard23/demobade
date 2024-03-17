const mongoose = require('mongoose')

const VendorPaymentSchema = new mongoose.Schema( {  

    billReferenceNo:{
        type:String,
        required: true
    },
    AccountatntId:{//person who actions the payment
        type:String,
    },
    ActivityLog:Array,
    Amount:Number,
    PaymentDate:String,
    status:{
        type:String,
        default:"Posted"
    },
    bankAccount:{
        type: String,
    },
    remarks:String,
    vendor: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor'
    },
     customer: {
        type: mongoose.Types.ObjectId,
        ref: 'Customer'
    },
    dr:{
        type:Boolean,
        default:false
    },
    cr:{
        type:Boolean,
        default:false
    },
    Balance:Number,
    location:String,
   
},{timestamps:true})

const VendorPayment = mongoose.model('VendorBill', VendorPaymentSchema);

module.exports = VendorPayment