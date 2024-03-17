const { WHouse } = require("../modules/warehouse");
const Employe = require("../modules/Employees");
const { ObjectId } = require("mongodb");

//invoicer Access

// post invoice rout checker
async function PostInvoice(req, res, next) {
 try{
    await Employe.findOne({Signature:req.body.signatureUrl}).then(user =>{
      if (ObjectId.isValid(user._id)) {
        if( user.jobTittle === "Invoicer" ){
          next();
        }else{
        throw new Error('You do not have necessary access right to perform restricted actions.')
        }
      }else{
        throw new Error('Could not fetch initiator')
      }
  })
 
 }catch(error){
      res.status(500).json({error:error.message})
 }

}

// post invoice rout checker
async function AccountantViewAccess(req, res, next) {
 try{
    await Employe.findById(req.params.id).then(user =>{
      if (ObjectId.isValid(user._id)) {
        if( user.Department === "Accounting" ||  user.role === "Admin" ){
          next();
        }else{
        throw new Error('you lack necessary Access right to perform this Operation.please contact Administrator')
        }
      }else{
        throw new Error('Could not fetch initiator')
      }
  })
 
 }catch(error){
  error ? res.redirect('/api/v1/404') :''
 }

}


// get ware house middleware
async function ValidStockTransfer(req, res, next) {
  if (ObjectId.isValid(req.params.id)) {
    user = await Employe.findById(new ObjectId(req.params.id));
    
    if( user.role === "Admin" ||  user.jobTittle === "Invoicer"){
        next();
    }else if (user) {
      const WHouses = [];
      await WHouse.findById(new ObjectId(user.workLocation)).then((warehouse) =>
        WHouses.push(warehouse)
      );
      res.status(200).render("warehouse", { title: "Warehouse", WHouses });
    }
  }
}




// warehouse setup  for route protection
async function adminWareHouseSetUp(req, res, next) {

  if (ObjectId.isValid(req.params.ADMINID)) {
    user = await Employe.findById(new ObjectId(req.params.ADMINID));
    if( user.role === "Admin"){
      next();
  }else{
    res.redirect('/api/v1/404')
  }
  }
}

module.exports = {ValidStockTransfer,adminWareHouseSetUp,PostInvoice,AccountantViewAccess};
