const express    = require('express');

const Match       = require('../../../models/Match');
const matchRoutes = express.Router();

matchRoutes.get('/all', (req, res, next) => {
    Match.find({ "keeper": "592e1a70296d6b4873842873"})
      .sort({updated_at: -1})
      .select({
        "petOwner": 1,
        "comment": 1,
        "rate": 1,
       })
      .populate({
        path: 'petOwner',
        select: {"name":1, "picture": 1 },
      })
      .exec()
      .then((matches) => res.send(matches))
      .catch((err) => res.send(err));
});

module.exports = matchRoutes;
