const mongoose = require('mongoose')

const CustomerReports = new mongoose.Schema( {  

    ReferenceNo:{
        type:String,
        required:true,
        unique:true,
    },
    DebitAmount:Number,
    CreditAmount:Number,
    Date:String,
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    Balance:{
        type:Number,
        default:0
    },
    cr:{
        type:Boolean,
    },
    dr:{
        type:Boolean,
    },
},{timestamps:true})

const CustomerReport = mongoose.model('customerReport', CustomerReports);

module.exports = CustomerReport