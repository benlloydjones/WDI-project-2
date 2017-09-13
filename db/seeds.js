const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

// required models
const CastMember = require('../models/castMember');
const Episode = require('../models/episode');
const Series = require('../models/series');
const User = require('../models/user');

//delete existing db data
const promises = [
  CastMember.remove(),
  Episode.remove(),
  Series.remove(),
  User.remove()
];

Promise.all(promises)
  .then(() => {
    return User
      .create([
        {username: 'ben', password: 'password', passwordConfirmation: 'password', email: 'benlloydjones@gmail.com', admin: true}
      ]);
  })
  .then(users => {
    console.log(`${users.length} users have been created`);

    return Series
      .create([
        {seriesName: 'Star Trek: the Original Series', image: 'http://www.gstatic.com/tv/thumb/tvbanners/183885/p183885_b_v8_aj.jpg'},
        {seriesName: 'Star Trek: the Animated Series', image: 'http://www.gstatic.com/tv/thumb/tvbanners/493639/p493639_b_v8_au.jpg'},
        {seriesName: 'Star Trek: the Next Generation', image: 'http://www.gstatic.com/tv/thumb/tvbanners/183887/p183887_b_v8_ah.jpg'}
      ]);
  })
  .then(seriess => {
    console.log(`${seriess.length} series have been created`);

    return Episode
      .create([
        {title: 'Encounter at Farpoint', series: seriess[2]},
        {title: 'The Naked Now', series: seriess[2]},
        {title: 'Code of Honor', series: seriess[2]},
        {title: 'The Last Outpost', series: seriess[2]},
        {title: 'Where No One Has Gone Before', series: seriess[2]},
        {title: 'The Cage', series: seriess[0]},
        {title: 'The Man Trap', series: seriess[0]},
        {title: 'Charlie X', series: seriess[0]},
        {title: 'Where No Man Has Gone Before', series: seriess[0]},
        {title: 'The Naked Time', series: seriess[0]},
        {title: 'Beyond The Farthest Star', series: seriess[1]},
        {title: 'Yesteryear', series: seriess[1]},
        {title: 'One of Our Planets is Missing', series: seriess[1]},
        {title: 'The Lorelei Signal', series: seriess[1]},
        {title: 'More Tribbles, More Troubles', series: seriess[1]}
      ]);
  })
  .then(episodes => {
    console.log(`${episodes.length} episodes have been created`);

    return CastMember
      .create([
        {firstname: 'William', lastname: 'Shatner'},
        {firstname: 'Leonard', lastname: 'Nimoy'},
        {firstname: 'DeForest', lastname: 'Kelley'},
        {firstname: 'Nichelle', lastname: 'Nichols'},
        {firstname: 'James', lastname: 'Doohan'},
        {firstname: 'George', lastname: 'Takei'},
        {firstname: 'Patrick', lastname: 'Stewart'},
        {firstname: 'Jonathan', lastname: 'Frakes'},
        {firstname: 'Marina', lastname: 'Sirtis'},
        {firstname: 'Gates', lastname: 'McFadden'},
        {firstname: 'LeVarr', lastname: 'Burton'},
        {firstname: 'Brent', lastname: 'Spiner'}
      ]);
  })
  .then(castMembers => {
    console.log(`${castMembers.length} cast members created`);
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
