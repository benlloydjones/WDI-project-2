const User = require('../models/user');

function userAuth(req, res, next) {
  // console.log('getting userAuth');
  // if(!req.session.userId) return next();
  User
    // .findById(req.session.userId)
    .findOne({})
    .then(user => {
      res.locals.isAuthenticated = true;
      res.locals.currentUser = user;
      req.currentUser = user;

      // remove this after you've finished testing...
      req.session.userId = user.id;
      next();
    });
}

module.exports = userAuth;
