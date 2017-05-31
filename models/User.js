
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  facebookID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: String,
  picture: {
    type: String,
    required: true
  },
  friends: Array,
  location: {
    type: {
      type: 'String',
    },
    coordinates: [Number]
  },
  keeper: {
    type:Boolean,
    default: false
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    virtuals: true
  }
});


userSchema.index({location:'2dsphere'});






// userSchema.virtual('distance').get( () => {
//   var point = { type : "Point", coordinates : [40.419847,-3.705836] };
//   return User.geoNear(point, { maxDistance : 6000, spherical : true }, function(err, results, stats) {
//      console.log(results);
//      return results;
//   });
//
// });

// userSchema.virtual('fullname').get(function() {
//     return this.name + ' big poppa ';
// });
//
// userSchema.statics.testing = (cb) => {
//   var point = { type : "Point", coordinates : [40.419847,-3.705836] };
//   User.geoNear(point, { maxDistance : 6000, spherical : true }, function(err, results, stats) {
//      console.log(results);
//   });
//   console.log('hey');
// };

const User = mongoose.model('User', userSchema);


module.exports = User;
