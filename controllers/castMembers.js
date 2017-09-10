const CastMember = require('../models/castMember');
const Episode = require('../models/episode');

function castMembersShow(req, res) {
  console.log('in here');
  CastMember
    .findById(req.params.id)
    .exec()
    .then(castMember => {
      return Episode
        .find({cast: castMember})
        .exec()
        .then(episodes => {
          res.render('castMembers/show', { episodes, castMember });
        });
    })
    .catch(err => res.render('error', { err }));

}

module.exports = {
  show: castMembersShow
};
