const MongoClient = require('mongodb').MongoClient;
// const seeds = require('./test.json');
// Connection URL
const url = 'mongodb://localhost/petkeepers';

// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  if (err) {
    throw err;
  }

  console.log('Connected correctly to server');

  db.test.insertOne({"test":"test"});

  console.log('Inserted seeds correctly to server');
  db.close();
});
