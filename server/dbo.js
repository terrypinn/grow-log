const { MongoClient } = require('mongodb');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/';
const DB_NAME = process.env.DB_NAME || 'grow_log';

let _db;

const connect = async () => {
  return MongoClient
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    })
    .then(client => {
      _db = client.db(DB_NAME);
    });   
};

const getDb = () => {
  return _db;
};

exports.connect = connect;
exports.getDb = getDb;