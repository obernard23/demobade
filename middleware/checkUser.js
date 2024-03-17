const Employe = require("../modules/Employees");


//this fuction is to veryfy juser trying to reset password
async function checkResetUser(req, res, next) {
  const user = await Employe.findOne({ Email: req.body.EmailTOreset });
  if (!user) {
    res.send(404, "User not found")
  } else {
    next();
  }
}


//this fuction verifies user trying to login
async function checkLoginUser(req,res,next){
  const Email = req.body.Email
 try {
  const user = await Employe.findOne( {Email:Email});
  if (user.status ==='active') {
    res.status(200)
    next();
  }
  else{ 
    res.status(500)
    throw new Error("Sorry, this user does not have authorized access.");
   }
 } catch (error) {
  res.status(500).json({errorMessage:error.message});
 }
}

module.exports = {checkResetUser,checkLoginUser}
