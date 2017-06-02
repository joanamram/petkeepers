const mongoose     = require('mongoose');
const Match    = require('../models/Match');

mongoose.connect('mongodb://localhost/petkeepers');

const matches = [
  {
    keeper: "592e1a70296d6b4873842873",
    petOwner: "592e1fb4d93bb649b2dd5a57",
    comment: "Me cuido la mascota de lujo",
    rate: 5
  },
  {
    keeper: "592e1a70296d6b4873842873",
    petOwner: "592e1fb4d93bb649b2dd5a56",
    comment: "Servicio impecable",
    rate: 4
  },
  {
    keeper: "592e1a70296d6b4873842873",
    petOwner: "592e1fb4d93bb649b2dd5a5b",
    comment: "Tuvieron que amputar a mi perro porque Álvaro lo dejo suelto en un parque...",
    rate: 1
  },
];


Match.create(matches, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((product) => {
    console.log(product.name);
  });
  mongoose.connection.close();
});
