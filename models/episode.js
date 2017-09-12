const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  commentor: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  rating: Number
});

const episodeSchema = mongoose.Schema({
  title: { type: String, required: true },
  series: { type: mongoose.Schema.ObjectId, ref: 'Series', required: true },
  synopsis: String,
  image: String,
  comments: [commentsSchema]
});

episodeSchema.virtual('castMembers', {
  ref: 'CastMember',
  localField: '_id',
  foreignField: 'episodes'
})
  .set(function setCastMembers(castMembers) {
    this._castMembers = castMembers;
  });

episodeSchema.virtual('avgRating')
  .get(function getAvgRating() {
    if(this.comments.length > 0) {
      let total = 0;
      this.comments.forEach(comment => total += comment.rating);
      const avg = total / this.comments.length;
      return Math.round(avg*2)/2;
    } else {
      return 0;
    }
  });

episodeSchema.pre('save', function addMemberToEpisode(next) {

  if(this.isModified('comments')) return next();

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
