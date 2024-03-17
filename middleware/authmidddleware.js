const jwt = require('jsonwebtoken');
const Employees = require('../modules/Employees');

const requireAuth = (req, res, next) => {
  const token = req.cookies.DemoBade;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'BigBern', (err, decodedToken) => {
      if (err) {
        res.redirect('/api/v1/SignIn');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/api/v1/SignIn');
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.DemoBade;
  if (token) {
    jwt.verify(token, 'BigBern', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        if(res.locals.user === null) {
          res.redirect('/api/v1/SignIn');
        }
        next();
      } else {
        let user = await Employees.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
     
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = {requireAuth ,checkUser}