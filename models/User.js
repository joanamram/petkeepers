
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  facebookID: String,
  name: String,
  email: String,
  picture: String,
  friends: Array,
  location: {type:{ type: String }, coordinates: [Number]},
  keeper: {type:Boolean, default: false}
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.index({location:'2dsphere'});

const User = mongoose.model('User', userSchema);
module.exports = User;
