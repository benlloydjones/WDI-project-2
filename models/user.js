const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// the general schema for our users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: Boolean,
  image: String
});

// this is virtual for when saving data
// storing the confirm password value for checking that passwords match
userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });


// pre-validate
// this checks that the confirm password is the same as password when creating a user
userSchema.pre('validate', function checkPasswordConfirmation(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }
  next();
});

// pre-save
// this hashes the password when the user saves a password
userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// this is a method on all user objects that allows us to check if their passowrd is correct
// returns true is password matches this.password
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
