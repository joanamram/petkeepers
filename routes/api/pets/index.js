const express    = require('express');
const multer     = require('multer');
const upload     = multer({ dest: 'uploads/' })
const Pets       = require('../../../models/Pets');
const User       = require('../../../models/User');


const petsRoutes = express.Router();

petsRoutes.post('/pets/new', upload.single('photo'),  (req, res, next) => {
  const newPet = new petModel ({
      petName: req.body.name,
      yearOfBirth: req.body.yearOfBirth,
      description: req.body.description,
      picture: req.body.picture,
      petOwner: req.user._id
  });

  newPet.save()
      .then( Pets => {res.json({ message: 'New Pet created!', id: newPet._id });})
      .reject( err => {res.json(err); });
  });


petsRoutes.post('/pets/:id/edit', (req, res, next) =>  {
  const updates = {
    petName: req.body.name,
    yearOfBirth: req.body.yearOfBirth,
    description: req.body.description,
    picture: req.body.picture,
    petOwner: req.user._id
  };

  petModel.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      return res.status(400).json({ message: "Unable to update pet", error});
    }
    res.json({ message: 'Pet updated successfully'});
  });
});


petsRoutes.delete('/:id', (req, res, next) => {
    petModel.findByIdAndRemove(req.params.id)
      .then((newPet) => res.status(202).json({ message: 'pet removed successfully' }))
      .catch(err => res.status(500).json({ message: 'impossible to remove the pet', error: err }));
});


module.exports = petsRoutes;
