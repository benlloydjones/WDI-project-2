const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
  title: { type: String, required: true },
  series: { type: mongoose.Schema.ObjectId, ref: 'Series', required: true },
  synopsis: String,
  image: String
});

episodeSchema.virtual('castMembers', {
  ref: 'CastMember',
  localField: '_id',
  foreignField: 'episodes'
})
  .set(function setCastMembers(castMembers) {
    this._castMembers = castMembers;
  });

episodeSchema.pre('save', function addMemberToEpisode(next) {
  this._castMembers = this._castMembers || [];
  const CastMember = this.model('CastMember');
  CastMember
    .update({ _id: { $nin: this._castMembers } }, { $pull: { episodes: this._id } }, { multi: true })
    .exec()
    .then(() => {
      return CastMember
        .update({ _id: this._castMembers }, { $addToSet: { episodes: this._id } }, { multi: true });
    })
    .then(next)
    .catch(next);
});

module.exports = mongoose.model('Episode', episodeSchema);
