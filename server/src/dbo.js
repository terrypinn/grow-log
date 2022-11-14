const { MongoClient } = require('mongodb');

let _db;

const connect = async () => {
  return MongoClient
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    })
    .then(client => {
      _db = client.db(process.env.DB_NAME);
    });
};

const getDb = () => {
  return _db;
};

exports.connect = connect;
exports.getDb = getDb;