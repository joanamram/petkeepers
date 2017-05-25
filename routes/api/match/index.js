const express    = require('express');
const multer     = require('multer');
const Pets       = require('../../../models/Pets');
const User       = require('../../../models/User');
const Match       = require('../../../models/Match');

const matchRoutes = express.Router();

matchRoutes.post('/match',  (req, res, next) => {
  const newRelation = new relationModel({
    petOwner : req.user._id;
    //keeper : req.body.keeper._id;
    pet : req.body.pet._id;
    console.log(req.body);
    console.log(req.user);
  });


  newRelation.save()
      .then( Pets => {res.json({ message: 'There was a match!');})
      .reject( err => {res.json(err); });
  });
});



matchRoutes.post('/match/rate', (req, res, next) =>  {
  const newRelationRate = new relationModelRate({
    petOwner : req.user._id;
    //keeper : req.body.keeper._id;
    pet : req.body.pet._id;
    // comment:req.body.data.formInfo.comments;
    // rate:req.body.data.formInfo.rate;
    console.log(req.body);
    console.log(req.user);
  });

  relationModelRate.save((err) => {
    if (err) {
      return res.status(400).json({ message: "Something went wrong", error});
    }
    res.json({ message: 'Classification made successfully'});
  });
};



module.exports = matchRoutes;
