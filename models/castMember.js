const mongoose = require('mongoose');

const castMemberSchema = mongoose.Schema({
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  episodes: [ { type: mongoose.Schema.ObjectId, ref: 'Episode' } ],
  image: String
});

castMemberSchema.methods.appearsIn = function(episode) {
  if(!episode) return false;
  return this.episodes.find(episodeId => episodeId.toString() === episode.id);
};

module.exports = mongoose.model('CastMember', castMemberSchema);
