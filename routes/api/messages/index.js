
const express    = require('express');
const passport   = require('passport');

const Message       = require('../../../models/Messages');
const messagesRoutes = express.Router();

messagesRoutes.get('/', (req, res, next) => {
    Message.find({ "members": {$in: ["592567f4b137cf46a4aa56d5"]}})
      .sort({updated_at: -1})
      .select({
        "updated_at": 1,
        "messages.content": 1,
        "messages.read": 1,
        "messages.authorId": 1,
         "messages": {
           $slice: -1,
         },
         "members": 1
       })
      .populate({
        path: 'members',
        match: { _id: { $ne: "592567f4b137cf46a4aa56d5" }},
        select: {_id: 0, "name":1, "picture": 1 },
      })
      .exec()
      .then((message) => res.send(message))
      .catch((err) => res.send(err));
});

messagesRoutes.post('/getId', (req, res, next) => {
  if (!req.body.recipient) {
    return next(res.status(500).send({error:'Recipient not provided'}));
  }
  Message.find({ "members": {$all: ["592567f4b137cf46a4aa56d5", req.body.recipient]}})
    .select({"_id": 1})
    .exec()
    .then((message) => res.send(message[0]._id))
    .catch((err) => res.send(false));

});

messagesRoutes.post('/new', (req, res, next) => {
  if (!req.body.recipient) {
    return next(res.status(500).send({error:'Recipient not provided'}));
  }
  const newMessage = new Message({
    members: [
      req.body.recipient,
      "592567f4b137cf46a4aa56d5"
    ]
  });
  newMessage.save()
    .then((message) => res.send(message._id))
    .catch((err) => res.send(false));
});

messagesRoutes.get('/:id/', (req, res, next) => {
  Message.findById(req.params.id)
  .select({
    "messages.content": 1,
    "messages.authorId": 1,
    "messages.createdAt": 1,
     "members": 1
   })
  .populate({
    path: 'members',
    match: { _id: { $ne: "592567f4b137cf46a4aa56d5" }},
    select: {_id: 1, "name":1, "picture": 1, "keeper": 1 },
  })
  .exec((err, message) => res.send(message));
});

messagesRoutes.post('/:id/add', (req, res, next) => {
  if (!req.body.content) {
    return next(res.status(500).send({error:'Message is empty'}));
  }
  const addMessage = {
    authorId: "592567f4b137cf46a4aa56d5",
    content: req.body.content,
  };
  Message.findOneAndUpdate(
      {"_id": req.params.id},
      { $push: { messages: addMessage } },
      { new: true})
      .select({
        "messages.content": 1,
        "messages.authorId": 1,
        "messages": {
          $slice: -1,
        },
       })
      .exec()
      .then((message) => res.send(message.messages[0]))
      .catch((err) => res.send(false));
});



module.exports = messagesRoutes;
