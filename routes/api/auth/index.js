const express    = require('express');
const passport   = require('passport');
const bcrypt     = require('bcrypt');

// Our user model
const User       = require('../../../models/User');
const authRoutes = express.Router();

authRoutes.post('/signup', (req, res, next) => {
  console.log('0');
  const username = req.body.username;
  const password = req.body.password;

  console.log('1');

  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password' });
    return;
  }

  User.findOne({ username: username }, '_id', (err, foundUser) => {
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }
    console.log('2');

    const salt     = bcrypt.genSaltSync(6);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser = new User({
      username: username,
      password: hashPass
    });

    theUser.save((err) => {
      console.log('3');
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }

        res.status(200).json(req.user);
      });
    });
  });
  console.log('4');
});

authRoutes.post('/login', (req, res, next) => {
  console.log('h1p2');
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

authRoutes.get("/facebook", passport.authenticate("facebook", { scope: ['user_friends', 'email'] }));

authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/private-page",
  failureRedirect: "/"
}));

module.exports = authRoutes;
