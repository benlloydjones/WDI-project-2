const router = require('express').Router();
const registrations = require('../controllers/registrations');
const seriess = require('../controllers/seriess');
const episodes = require('../controllers/episodes');
const castMembers = require('../controllers/castMembers');

// const sessions = require('../controllers/sessions');

// const secureRoute = require('../lib/secureRoute');

// this gets us to the homepage
router.get('/', (req, res) => res.render('home',));

// these are the registration routes
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

// these are the series routes
router.route('/seriess')
  .get(seriess.index)
  .post(seriess.create);

router.route('/seriess/new')
  .get(seriess.new);

router.route('/seriess/:id')
  .get(seriess.show)
  .put(seriess.update)
  .delete(seriess.delete);

router.route('/seriess/:id/edit')
  .get(seriess.edit);

// these are the episode routes
router.route('/episodes/:id')
  .get(episodes.show);

// these are the castMember routes
router.route('/castmembers/:id')
  .get(castMembers.show);

module.exports =router;
