const Episode = require('../models/episode');
const CastMembers = require('../models/castMember');

function episodesShow(req, res) {
  Episode
    .findById(req.params.id)
    .populate('cast')
    .exec()
    .then(episode => res.render('episodes/show', { episode }))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  show: episodesShow
};
