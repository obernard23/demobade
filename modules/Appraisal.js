const mongoose = require('mongoose')

var kpis = new mongoose.Schema ( {  
    measure : String  , 
    objective : String ,
    target: Number ,
    employeeScore: Number ,
    ManagerScore: Number ,
    MdScore:Number ,
  });  
  
  var Appraisal = new mongoose.Schema ( {  
    Employe : mongoose.Types.ObjectId , 
    title : String  , 
    date : Date  , 
    kpi : [kpis]  , 
    meta : {  
      ratings : String  , 
      score : Number  
    } ,
    MdComment :String , 
    HrCommnet :String ,
    ManagerComment :String ,
    employeComment :String ,
  });  
  
 const Appraisals = mongoose.model ('Appraisal', Appraisal);

 module.exports = Appraisals;