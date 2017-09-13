const User = require('../models/user');

function registrationsCreate(req, res) {
  User
    .create(req.body)
    .then(() => {
      req.flash('info', 'Now please login');
      res.redirect('/');
    })
    .catch(err => res.render('error', { err }));
}

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsEdit(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('registrations/edit', { user }))
    .catch(err => res.render('error', { err }));
}

function registrationsUpdate(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(res.redirect('/'))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  create: registrationsCreate,
  new: registrationsNew,
  edit: registrationsEdit,
  update: registrationsUpdate
};
