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

seriesSchema.virtual('avgRating')
  .get(function getSeriesRating() {
    if(!this.episodes) return false;
    const total = this.epsodes.reduce((sum, epsode) => sum + epsode.avgRating);
    const avg = total / this.comment.length;
    return Math.round(avg*2)/2;
  });

module.exports = mongoose.model('Series', seriesSchema);
