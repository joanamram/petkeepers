
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const matchSchema = new Schema({
  petName: String,
  fromDate: Date,
  toDate: Date,
  keeper: {type:Boolean, default: false},
  petOwner: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
  comment: String,
    rate: Number
  },

{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const User = mongoose.model('Match', matchSchema);
module.exports = Match;
