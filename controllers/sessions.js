const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res) {
  User
    .findOne( { email: req.body.email } )
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Invalid credentials');
        return res.redirect('/login');
      }
      // user is validated
      req.session.userId = user.id;
      res.redirect('/');
    });
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
