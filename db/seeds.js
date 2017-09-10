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

CastMember
  .create([
    {firstname: 'Patrick', lastname: 'Stewart', image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTc0MzU5ODQ5OF5BMl5BanBnXkFtZTYwODIwODk1._V1_.jpg'}
  ])
  .then((castMembers) => {
    console.log(`${castMembers.length} cast members created!`);

    return Episode
      .create([
        {title: 'Encounter at Farpoint', cast: [castMembers[0]], synopsis: 'On the maiden mission of the U.S.S. Enterprise (NCC-1701-D), an omnipotent being known as Q challenges the crew to discover the secret of a mysterious base in an advanced and civilized fashion.', image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3NjQ2NjEzMl5BMl5BanBnXkFtZTgwMzY2Mzg0MjE@._V1_.jpg'}
      ]);
  } )
  .then((episodes) => {
    console.log(`${episodes.length} episodes created!`);

    return Series
      .create([
        {seriesName: 'Star Trek: The Next Generation', episodes: [episodes[0]], image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDViYjAyZWUtNGQxMy00MDUyLTlkZTAtOWNkY2M5ZTk5MTE5XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_CR0,0,701,1000_AL_.jpg'}
      ]);
  })
  .then((series) => console.log(`${series.length} series created!`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
