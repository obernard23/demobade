const mongoose = require('mongoose')

const CreditPaymentSchema = new mongoose.Schema( {  

    paymentReferenceNo:{
        type:String,
        unique:true,
    },
    BillNo:{
        type: mongoose.Types.ObjectId,
        required:false,
        unique:true,
    },
    Accountant:{//person who actions the payment
        type:String,
    },
    ActivityLog:Array,
    Attachment:String,
    status:{
        type:String,
        default:'posted'
    },
    PaymentDate:String,
    bankAccount:{
        type: String,
    },
    remarks:String,
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required: false,
    },
    previousBalance:Number,
    crAmount:{
        type:Number,
        default:0
    },
    drAmount:{
        type:Number,
        default:0
    },
    collectionRef:{
        type:String,
    },
    cr:{
        type:Boolean
    },
    dr:{
        type:Boolean
    }
},{timestamps:true})

const CreditCustomerPayment = mongoose.model('creditPayment', CreditPaymentSchema);

module.exports = CreditCustomerPayment