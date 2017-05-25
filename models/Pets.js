
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const petSchema = new Schema({
  petName: String,
  yearOfBirth: Date,
  description: String,
    pic_path: String,
    pic_name: String,
  petOwner: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
},

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const User = mongoose.model('Pets', petSchema);
module.exports = Pets;
