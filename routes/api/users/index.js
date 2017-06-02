const express    = require('express');
const User       = require('../../../models/User');
const usersRoutes = express.Router();



usersRoutes.get('/test', (req, res, next) => {
  User.testing();
  res.json('done');
});

usersRoutes.get('/me', (req, res, next) => {
  // let response = { _id: '592e1a70296d6b4873842873',
  // updated_at: '2017-06-01T23:58:17.734Z',
  // created_at: '2017-05-31T01:20:48.287Z',
  // email: 'a.bernarsilos@gmail.com',
  // picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13906627_1054107048040195_149341570348289327_n.jpg?oh=1e29e194e549dcdae19418ae52025b82&oe=59B1FF02',
  // facebookID: '1344704128980484',
  // name: 'Alvaro Bernar Silos',
  // __v: 0,
  // keeper: false,
  // location : {
  //     type : "Point",
  //     coordinates : [
  //         "40.416775",
  //         "-3.70379"
  //     ]
  // },
  // friends: [ '10211878185902164' ] };
  res.json(req.user);
});

usersRoutes.get('/:id', (req, res, next) => {
  User.findOne({"facebookID":req.params.id}, (err, user) => {
    res.send(user);
  });
});

usersRoutes.post('/:id/location', (req, res, next) => {
  let location = {
    type: 'Point',
    coordinates: ['40.416775', 	'-3.703790']
  };

  User.findOneAndUpdate(
     { "facebookID" : req.params.id },
     { $set: {
       "location": location}
     }, (err, user) => {
       if (err) {
         console.log(err);
       } else if (user) {
         console.log("user: "+user);
       }
     });
});

usersRoutes.get('/me/keeper', (req, res, next) => {
  let keeper;
  let keeperPromise = new Promise((resolve, reject) => {
    if (!req.body.keeper) {
      User.findOne({"facebookID": req.user.facebookID},
      { keeper: 1}, (err, user) => {
        if (user.keeper === true) keeper = false;
        else if (user.keeper === false) keeper = true;
        resolve(keeper);
      });
    } else if (req.body.keeper) {
      keeper = req.body.keeper;
      resolve(keeper);
    }
  });
  keeperPromise.then((keeper) => {
    User.findOneAndUpdate(
      {"facebookID": req.user.facebookID},
      { $set: {
        "keeper": keeper }
      }, (err, user) => {
        if (err) {
          console.log(err);
        } else if (user) {
          res.json({
            keeper: user.keeper
          });
          console.log("user: "+user);
        }
      }
    );
  });

});

module.exports = usersRoutes;
