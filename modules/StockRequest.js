const mongoose = require('mongoose')

const StockRequestSchema = new mongoose.Schema({
    WHID: {
        type: mongoose.Types.ObjectId,
        ref: 'Whouse',
        required: true,
    },
    orders: [],
    billReferenceNo: {
        type: String,
    },
    Status: {
        type: String,
        default:'pending'
    },
    ActivityLog: [],
    RaisedBy:String,
    startDate:String,
    
},{timestamps:true})

const StockRequest = mongoose.model('StockRequest', StockRequestSchema)

module.exports = StockRequest