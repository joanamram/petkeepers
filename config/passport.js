const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');
const FbStrategy = require('passport-facebook').Strategy;


var FB = require('fb');


module.exports = function (passport) {

  passport.use(new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: 'Incorrect username' });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: 'Incorrect password' });
        return;
      }

      next(null, foundUser);
    });
  }));

  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });

  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }

      cb(null, userDocument);
    });
  });

  passport.use(new FbStrategy({
    clientID: process.env.FB_API_KEY,
    clientSecret: process.env.FB_API_PASS,
    callbackURL: "http://localhost:3000/api/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {

    FB.setAccessToken(accessToken);

    var apiFriends = new Promise((resolve, reject) => {
      FB.api(
          "/me/friends",
          function (response) {
            if (response && !response.error) {
              var friendsArr = response.data.map(function(friend) {return friend.id;});
              resolve(friendsArr);
            } else {
              reject('Facebook Friends API has given no response');
            }
          }
      );
    });
    var apiProfile = new Promise((resolve, reject) => {
        FB.api(
          "/"+profile.id,
          {"fields":"email, picture"},
          function (response) {
            if (response && !response.error) {
              resolve({email: response.email, picture: response.picture.data.url});
            }
            else {
              reject('Facebook Profile API has given no response');
            }
          }
        );
    });
    var findDb = new Promise((resolve, reject) => {
      User.findOne({ facebookID: profile.id },{_id: 1}, (err, user) => {

        if (err) {
          reject("Error with database");
        }
        if (user) {
          resolve(user);
        } else {
          resolve("create");
        }
      });
    });

    Promise.all([apiFriends, apiProfile, findDb]).then(promises => {
      let friends = promises[0];
      let email = promises[1].email;
      let picture = promises[1].picture;
      let name = profile.displayName;
      let facebookID = profile.id;

      if (promises[2] === "create") {
        const newUser = new User({
          friends: friends,
          email: email,
          picture: picture,
          facebookID: facebookID,
          name: name,
        });
        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          done(null, newUser);
        });
      } else if (promises[2]._id) {
        User.findOneAndUpdate(
           { "_id" : promises[2]._id },
           { $set: {
             "friends": friends,
             "email": email,
             "picture": picture,
             "facebookID": facebookID,
             "name": name
           }
           }, (err, user) => {
             if (err) {
               console.log(err);
               return done(err);

             }
             console.log("user: "+user);
             done(null, user);
           });

      } else {
        return done("error");
      }

    }).catch(reason => {
      return done(reason);
    });
  }));

};
