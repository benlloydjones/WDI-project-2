const Series = require('../models/series');

function seriessIndex(req, res) {
  Series
    .find()
    .exec()
    .then((seriess) => res.render('seriess/index', { seriess }))
    .catch(err => res.render('error', { err }));
}

function seriessShow(req, res) {
  Series
    .findById(req.params.id)
    .populate('episodes')
    .exec()
    .then(series => res.render('seriess/show', { series }))
    .catch(err => res.render('error', { err }));
}

function seriessNew(req, res) {
  res.render('seriess/new');
}

function seriessCreate(req, res) {
  Series
    .create(req.body)
    .then(() => res.redirect('/seriess'))
    .catch(err => res.render('error', { err }));
}

function seriessEdit(req, res) {
  Series
    .findById(req.params.id)
    .exec()
    .then(series => res.render('seriess/edit', { series }))
    .catch(err => res.render('error', { err }));
}

function seriessUpdate(req, res) {
  Series
    .findById(req.params.id)
    .exec()
    .then(series => {
      series = Object.assign(series, req.body);
      return series.save();
    })
    .then(series => res.redirect(`/seriess/${series.id}`))
    .catch(err => res.render('error', { err }));
}

function seriessDelete(req, res) {
  Series
    .findById(req.params.id)
    .exec()
    .then(series => series.remove())
    .then(() => res.redirect('/seriess'))
    .catch(err => res.render('error', { err }));
}

module.exports = {
  index: seriessIndex,
  show: seriessShow,
  new: seriessNew,
  create: seriessCreate,
  edit: seriessEdit,
  update: seriessUpdate,
  delete: seriessDelete
};
