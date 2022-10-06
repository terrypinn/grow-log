
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good 'db' object
      if (db) {
        _db = db.db('growDiary');
        console.log('Connected to database.');
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
