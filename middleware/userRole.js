const Employe = require("../modules/Employees");
const { ObjectId } = require("mongodb");

//check route for admin acess only. and blocks user with out required permission 
const checkUserRole = async function (req, res, next) {
  if (ObjectId.isValid(req.params.id)) {
    user = await Employe.findById(new ObjectId(req.params.id));
    if ( user.role !== "Admin") {
        user.status = "suspended"
        user.save();
      res.status(401);
      res.redirect('/logout')
    }
    next();
  }
};

const ManagerAccess = async function (req, res, next) {
  if (ObjectId.isValid(req.params.WHMANAGER)) {
    user = await Employe.findById(new ObjectId(req.params.WHMANAGER));
    if ( user.role === "Staff") {
      res.status(404);
      res.render('404',{name:"BigBern",error:"You are not allowed to perform this operation"})
    }
    next();
  }
};

module.exports = {
  checkUserRole,
  ManagerAccess
};
