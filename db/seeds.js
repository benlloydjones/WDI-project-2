const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

// required models
const CastMember = require('../models/castMember');
const Episode = require('../models/episode');
const Series = require('../models/series');
const User = require('../models/user');

//delete existing db data
CastMember.collection.drop();
Episode.collection.drop();
Series.collection.drop();
User.collection.drop();



User
  .create([
    {username: 'ben', password: 'password', passwordConfirmation: 'password', email: 'benlloydjones@gmail.com', admin: true}
  ])
  .then(users => console.log(`${users.length} users have been created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
