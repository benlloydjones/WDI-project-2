const User = require('../models/user');

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => res.render('error', { err }));
}

function registrationsNew(req, res) {
  res.render('registrations/new');
}

module.exports = {
  create: registrationsCreate,
  new: registrationsNew
};
