const mongoose = require('mongoose');

const castMemberSchema = mongoose.Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  image: String
});

module.exports = mongoose.model('CastMember', castMemberSchema);
