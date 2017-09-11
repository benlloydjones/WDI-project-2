const mongoose = require('mongoose');

const seriesSchema = mongoose.Schema({
  seriesName: { type: String, required: true },
  image: String
});

module.exports = mongoose.model('Series', seriesSchema);
