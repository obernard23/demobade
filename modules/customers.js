const mongoose = require('mongoose');
const { isEmail} = require('validator');

const CustomerSchema = new  mongoose.Schema({
    Username:{
        type : String,
        required:[true,'This field cannot be empty'],
        lowercase:true
    },
    Debt:{
        type:Number,
        defaultValue:0
    },
    Notification:{
        type:Array,
    },
    purchased:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'please provide us Your phone Number'],
        unique:true,
    },
    Email:{
        type:String,
        // required:[true,'please entert an Email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please eneter a valid Email']
    },
    DOB:{
        type:String,
    },
    country:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    street:{
        type:String,
        required:false
    },
    Land_mark:{
        type:String,
        required:false
    },
    HouseNumber:{
        type:String,
        required:false
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    Question1:{
        type:String,
        required:false
    },
    Question1Ans:{
        type:String,
        required:false 
    },
    Question2:{
        type:String,
        required:false
    },
    Question2Ans:{
        type:String,
        required:false
    },
    NewsFeedSubscription:{
        type: Boolean,
        default: false
    },
    Image:{
        type:String,
    },
    discount:{
        type:Number,
        default:0
    },
    creditLimit:{
        type:Number,
        default:0,  
        required:true,
    },
    blocked:{
        type:Boolean,
        default:true
    },
    category:{
        type:String,
    },
    priceList:{
        type:String,
    },
    salesPerson:{
        type:mongoose.Types.ObjectId,
        ref:'EMPLOYEES'
    },
    lastPayDate:{
        type:String,
        default:''
    },
    Manager:{
        type:mongoose.Types.ObjectId,
        ref:'EMPLOYEES',
    },
    location:{
        type:mongoose.Types.ObjectId,
        ref:'WHouse',
        }

},{timestamps:true});

// save hashed password before updating to db
// CustomerSchema.pre('save', async function(doc,next){
//     const salt = await bcrypt.genSalt();
//     this.Password =  await bcrypt.hash(this.Password,salt)
//     next();
// })

const  Customer = mongoose.model(' Customer',CustomerSchema);

module.exports= Customer
