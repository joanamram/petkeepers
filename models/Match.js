const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const matchSchema = new Schema({
  keeper: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  },
  petOwner: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  },
  comment: String,
  rate: Number
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
