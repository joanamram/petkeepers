const express    = require('express');
const apiRoutes = express.Router();
const auth = require('./auth/index');
const users = require('./users/index');
const messages = require('./messages/index');
const match = require('./match/index');
// const search = require('./search/index');


apiRoutes.use('/auth', auth);
apiRoutes.use('/users', users);
apiRoutes.use('/messages', messages);
apiRoutes.use('/match', match);
// apiRoutes.use('/search', search);



module.exports = apiRoutes;
