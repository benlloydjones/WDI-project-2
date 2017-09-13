const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema({
  seriesName: { type: String, required: true },
  image: String
});

seriesSchema.virtual('episodes', {
  ref: 'Episode',
  localField: '_id',
  foreignField: 'series'
});

seriesSchema.virtual('avgRating').get(function() {
  const avgRatings = [];
  let length = 0;
  if(this.episodes.length === 0) {
    return 0;
  } else {
    this.episodes.forEach(episode => {
      if(episode.comments.length === 0) {
        avgRatings.push(0);
        length += 1;
      } else {
        episode.comments.forEach(comment => {
          avgRatings.push(comment.rating);
          length += 1;
        });
      }
    });
  }
  return Math.round((avgRatings.reduce((sum, rating) => {
    return sum + rating;
  }) / length)*2)/2;
});

module.exports = mongoose.model('Series', seriesSchema);
