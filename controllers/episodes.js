const Episode = require('../models/episode');
const CastMember = require('../models/castMember');
const Series = require('../models/series');
const Promise = require('bluebird');

function episodesIndex(req, res) {
  Episode
    .find()
    .exec()
    .then(episodes => res.render('episodes/index', { episodes }))
    .catch(err => res.render('error', { err }));
}

function episodesShow(req, res) {
  Episode
    .findById(req.params.id)
    .populate('castMembers')
    .populate('comments.commentor')
    .exec()
    .then(episode => {
      res.render('episodes/show', { episode });
    })
    .catch(err => res.render('error', { err }));
}

function episodesNew(req, res) {

  const data = {
    episode: Episode.findById(req.params.id).exec(),
    series: Series.find().exec(),
    castMembers: CastMember.find().exec()
  };

  Promise
    .props(data)
    .then(data => res.render('episodes/new', data))
    .catch(err => res.render('error', { err }));
}

function episodesCreate(req, res) {
  Episode
    .create(req.body)
    .then(() => res.redirect('/episodes'))
    .catch(err => res.render('error', { err }));
}

function episodesEdit(req, res) {

  const data = {
    episode: Episode.findById(req.params.id).exec(),
    series: Series.find().exec(),
    castMembers: CastMember.find().exec()
  };

  Promise
    .props(data)
    .then(data => res.render('episodes/edit', data))
    .catch(err => res.render('error', { err }));
}

function episodesUpdate(req, res) {
  console.log(req.body);
  Episode
    .findById(req.params.id)
    .exec()
    .then(episode => {
      episode = Object.assign(episode, req.body);
      return episode.save();
    })
    .then(episode => res.redirect(`/episodes/${episode.id}`))
    .catch(err => res.render('error', { err }));
}

function episodesDelete(req, res) {
  Episode
    .findById(req.params.id)
    .exec()
    .then(episode => episode.remove())
    .then(() => res.redirect('/episodes'))
    .catch(err => res.render('error', { err }));
}

function episodesCommentsDelete(req, res) {
  Episode
    .findById(req.params.id)
    .exec()
    .then(episode => {
      const comment = episode.comments.id(req.params.commentId);
      comment.remove();
      return episode.save();
    })
    .then(episode => res.redirect(`/episodes/${episode.id}`))
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function episodesCommentsCreate(req, res) {
  Episode
    .findById(req.params.id)
    .exec()
    .then(episode => {
      episode.comments.push(req.body);
      return episode.save();
    })
    .then(episode => res.redirect(`/episodes/${episode.id}`))
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}


module.exports = {
  index: episodesIndex,
  show: episodesShow,
  new: episodesNew,
  create: episodesCreate,
  edit: episodesEdit,
  update: episodesUpdate,
  delete: episodesDelete,
  commentsDelete: episodesCommentsDelete,
  commentsCreate: episodesCommentsCreate
};
