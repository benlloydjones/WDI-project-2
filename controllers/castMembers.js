const CastMember = require('../models/castMember');
const Episode = require('../models/episode');

function castMembersShow(req, res) {
  CastMember
    .findById(req.params.id)
    .populate('episodes')
    .exec()
    .then(castMember => res.render('castMembers/show', { castMember }))
    .catch(err => res.render('error', { err }));

}

function castMembersIndex(req, res) {
  CastMember
    .find()
    .exec()
    .then(castMembers => res.render('castMembers/index', { castMembers }))
    .catch(err => res.render('error', { err }));
}

function castMembersNew(req, res) {
  Episode
    .find()
    .exec()
    .then(episodes => res.render('castMembers/new', { episodes }))
    .catch(err => res.render('error', { err }));
}

function castMembersCreate(req, res) {
  CastMember
    .create(req.body)
    .then(() => res.redirect('/castmembers'))
    .catch(err => res.render('error', { err }));
}

function castMembersEdit(req, res) {
  CastMember
    .findById(req.params.id)
    // .populate('episodes')
    .exec()
    .then(castMember => {
      return Episode
        .find()
        .exec()
        .then(episodes => {
          res.render('castMembers/edit', { episodes, castMember });
        });
    })
    .catch(err => res.render('error', { err }));
}

function castMembersUpdate(req, res) {
  CastMember
    .findById(req.params.id)
    .exec()
    .then(castMember => {
      castMember = Object.assign(castMember, req.body);
      return castMember.save();
    })
    .then(castMember => {
      console.log(castMember.id);
      res.redirect(`/castmembers/${castMember.id}`);
    })
    .catch(err => res.render('error', { err }));
}

function castMembersDelete(req, res) {
  CastMember
    .findById(req.params.id)
    .exec()
    .then(castMember => castMember.remove())
    .then(() => res.redirect('/castmembers'))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  show: castMembersShow,
  index: castMembersIndex,
  new: castMembersNew,
  create: castMembersCreate,
  edit: castMembersEdit,
  update: castMembersUpdate,
  delete: castMembersDelete
};
