const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema({
  seriesName: { type: String, required: true },
  episodes: [ { type: mongoose.Schema.ObjectId, ref: 'Episode' }],
  image: String
});

module.exports = mongoose.model('Series', seriesSchema);
