const mongoose = require('mongoose');
const { Decimal128 } = require("mongodb");
const { isEmail} = require('validator');

const AssetSchema = new  mongoose.Schema({
    Name:{
        required: true,
        lowercase: true,
        unique: true,
        type: String,
    },
    modelName:{
        type: String,
        lowercase: true,
    },
    SerialNumber:{
        type:String,
        lowercase: true,
        unique: true,
    },
    PurchasedValue:{
        type:Number,
        default:0,
        required: true
    },
    PurchsedDate:{
        required: true,
        type:String,
    },
    ResidualValue:{
        type: Decimal128,
        default:0,
        required: true
    },
    DepreciationType:String,
    CurrentValue:{
        type: Decimal128,
        default:0,
        required: true
    },
    AssetCode:{
        type:String,
        unique:true,
        required: true
    },
    runDepreciation:{
        type:String,
        default:'off'

    },
    Category:String,
    status:String,
    AssignedTo:{
       type: String,
    },
    AcivityLog:Array,
    Image:String,
    color:String,
    usefulYear:Number,
    id:String,
    vendor:String,
    Activate:{ type:String,
        default:'off'},
    depreciationStartDate:String,
    description:String,
    status:{ type:String,
        default:'Runing',},
})

const  ASSETS = mongoose.model(' Asset',AssetSchema);

module.exports = ASSETS;