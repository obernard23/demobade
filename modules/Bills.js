const mongoose = require('mongoose')

const BillsSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Types.ObjectId,ref:'customers',
        required:true,
    },
    grandTotal:{type:Number},
    shippingFee:{type:Number},
    subTotal:{type:Number},
    startDate:{
        type:String,
        required:true,
    },
    paymentMethod:{type:String},
    orders:[],
    promotionItems:[],
    billStatus:{
        type:String,
        default:'Quotation'
    },
    status:{
        type:String,
    },
    bankAccount:{
        type: String,
    },
    discount:{type:Number},
    taxRate:{type:Number, default:0,required:true},
    whId:{
        type:mongoose.Types.ObjectId,
        ref:'whouses',
        required:true,
    },
    RaiseBy:{type:String},
    signatureUrl:{type:String},
    ActivityLog:[],
    rejectionReasons:String,
    registeredBalance:{type:Number},//amount collected from account alerts or cash payment
    isDelivered:{type:Boolean,default:false},//for delivery
    PaymentStatus:{type:String},//type of payment status either fully paid or half paid
    DELIVERYDATE:{type:Date},//delivery date of delivery order
    billReferenceNo:{type:String},//reference to eacch bill
    supportDoc:{type:String},//uploaded bank payment reference
    DriverNumber:String,
    DriverName:String,
    vehicleNumber:String,
    DeliveryComment:String,
    customerName:String,
    whProductId:mongoose.Types.ObjectId,//to map back to store object of product  so we can reduce quantity
    AccountantId:{
        type:mongoose.Types.ObjectId,
        ref:'Employees',
    },
    AccountantName:{
        type: String,
    },
    WayBillNo:String,
    salesPerson:{
        type:mongoose.Types.ObjectId,
        ref:'Employees',
    },
    invoicelocation:{type:String,required:true},
    priceList:String,
},{timestamps:true})

const bills = mongoose.model('bill',BillsSchema)

module.exports = bills