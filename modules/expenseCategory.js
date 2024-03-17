const mongoose = require('mongoose')

const ExpenseCategorySchema = new mongoose.Schema( {  

    NAME:{//person who actions the payment
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    
},{timestamps:true})


const ProductCategorySchema = new mongoose.Schema( {  

    NAME:{//person who actions the payment
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    
},{timestamps:true})

const UMOSchema = new mongoose.Schema( {  

    NAME:{//person who actions the payment
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    
},{timestamps:true})

const UMO = mongoose.model('UMO', UMOSchema);
const ProductCat = mongoose.model('productCategory', ProductCategorySchema);
const ExpenseCat = mongoose.model('ExpenseCategory', ExpenseCategorySchema);

module.exports = {ExpenseCat,ProductCat,UMO}