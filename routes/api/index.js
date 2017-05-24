const express    = require('express');
const apiRoutes = express.Router();
const auth = require('./auth/index');
const users = require('./users/index');


apiRoutes.use('/auth', auth);
apiRoutes.use('/users', users);

module.exports = apiRoutes;
