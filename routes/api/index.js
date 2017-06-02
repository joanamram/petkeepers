const express    = require('express');
const apiRoutes = express.Router();
const auth = require('./auth/index');
const users = require('./users/index');
const messages = require('./messages/index');
const match = require('./match/index');


apiRoutes.use('/auth', auth);
apiRoutes.use('/users', users);
apiRoutes.use('/messages', messages);
apiRoutes.use('/match', match);

module.exports = apiRoutes;
