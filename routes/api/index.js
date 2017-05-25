const express    = require('express');
const apiRoutes = express.Router();
const auth = require('./auth/index');
const users = require('./users/index');
const match = require('./match/index');
const pets = require('./pets/index');




apiRoutes.use('/auth', auth);
apiRoutes.use('/users', users);
apiRoutes.use('/pets', pets);
apiRoutes.use('/match', match);


module.exports = apiRoutes;
