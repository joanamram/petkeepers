const express    = require('express');
const apiRoutes = express.Router();
const auth = require('./auth/index');
const users = require('./users/index');
const messages = require('./messages/index');


apiRoutes.use('/auth', auth);
apiRoutes.use('/users', users);
apiRoutes.use('/messages', messages);

module.exports = apiRoutes;
