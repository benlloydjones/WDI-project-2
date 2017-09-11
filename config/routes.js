const router = require('express').Router();
const registrations = require('../controllers/registrations');
const seriess = require('../controllers/seriess');
const episodes = require('../controllers/episodes');
const castMembers = require('../controllers/castMembers');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

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
  .post(secureRoute, seriess.create);

router.route('/seriess/new')
  .get(secureRoute, seriess.new);

router.route('/seriess/:id')
  .get(seriess.show)
  .put(secureRoute, seriess.update)
  .delete(secureRoute, seriess.delete);

router.route('/seriess/:id/edit')
  .get(secureRoute, seriess.edit);

// these are the episode routes
router.route('/episodes')
  .get(episodes.index)
  .post(secureRoute, episodes.create);

router.route('/episodes/new')
  .get(secureRoute, episodes.new);

router.route('/episodes/:id')
  .get(episodes.show)
  .put(secureRoute, episodes.update)
  .delete(secureRoute, episodes.delete);

router.route('/episodes/:id/edit')
  .get(secureRoute, episodes.edit);

// router.route('/episodes/:id/cast/edit')
//   .get(episodes.castEdit)
//   .put(episodes.castUpdate);

// these are the castMember routes
router.route('/castmembers')
  .get(castMembers.index)
  .post(secureRoute, castMembers.create);

router.route('/castmembers/new')
  .get(secureRoute, castMembers.new);

router.route('/castmembers/:id')
  .get(castMembers.show)
  .put(secureRoute, castMembers.update)
  .delete(secureRoute, castMembers.delete);

router.route('/castmembers/:id/edit')
  .get(secureRoute, castMembers.edit);

// these are the sessions routes
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
