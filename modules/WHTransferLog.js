const mongoose = require('mongoose')

const ProductTransferSchema = new mongoose.Schema({
    to: {
        type: mongoose.Types.ObjectId,
        ref: 'Whouse',
        required: true,
    },
    from: {
        type: mongoose.Types.ObjectId,
        ref: 'Whouse',
        required: true,
    },
    orders: [],
    billReferenceNo: {
        type: String,
    },
    cfoApproval: {
        type: Boolean,
        default:false
    },
    storeKeeperApproval: {
        type: Boolean,
        default:false
    },
    ActivityLog: [],
    recievedDate:String,
    transferedDate:String,
    status:String,
    
},{timestamps:true})

const ProductTransfer = mongoose.model('ProductTransfer', ProductTransferSchema)

module.exports = ProductTransfer