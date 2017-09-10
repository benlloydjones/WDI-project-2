const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
  title: { type: String, required: true },
  cast: [ {type: mongoose.Schema.ObjectId, ref: 'CastMember' }],
  synopsis: String,
  image: String
});

module.exports = mongoose.model('Episode', episodeSchema);
