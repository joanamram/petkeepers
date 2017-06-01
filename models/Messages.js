const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const messageSchema = new Schema({
  members: {
    type: [
      {
        ref: 'User',
        type: Schema.Types.ObjectId,
      }
    ],
    required: true
  },
  lastModifier: String,
  messages: [
    {
      authorId: String,
      createdAt: {
        type: Date,
        default: Date.now
      },
      content: String,
      read: {
        type: Boolean,
        default: false
      }
    }
  ],
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
