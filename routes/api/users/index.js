const express    = require('express');
const User       = require('../../../models/User');
const usersRoutes = express.Router();

usersRoutes.get('/test', (req, res, next) => {
  User.testing();
  res.json('done');
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

usersRoutes.post('/:id/keeper', (req, res, next) => {
  let keeper;
  let keeperPromise = new Promise((resolve, reject) => {
    if (!req.body.keeper) {
      User.findOne({"facebookID":req.params.id},
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
      {"facebookID":req.params.id},
      { $set: {
        "keeper": keeper }
      }, (err, user) => {
        if (err) {
          console.log(err);
        } else if (user) {
          console.log("user: "+user);
        }
      }
    );
  });

});

module.exports = usersRoutes;
