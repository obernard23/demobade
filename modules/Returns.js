const mongoose = require('mongoose')

const ReturnstSchema = new mongoose.Schema( {  

    billReferenceNo:{
        type:String,
        required: true,
        unique:true
    },
    WHId:{
        type: mongoose.Types.ObjectId,
        ref: 'WareHouse',
        required: true
    },
    BillId:{
        type: mongoose.Types.ObjectId,
        ref: 'bills',
        required: true
    },
    ReturnDate:String,
    status:{
        type:String,
        default:"pending"
    },
   
    storeKeeper:String,
   
},{timestamps:true})

const StockReturns = mongoose.model('MachandiseReturn', ReturnstSchema);

module.exports = StockReturns