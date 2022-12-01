const mongoose = require('mongoose');
const env = require('./env');

const CONNECT_OPTIONS = { useNewUrlParser: true, useUnifiedTopology: true };

const connect = async () => {
  return mongoose
    .connect(env.DB_URI + env.DB_NAME, CONNECT_OPTIONS)
    .then(() => console.log(`Connected to database`))
    .catch(err => {
      console.error('Database connection error...');
      console.error(err.stack);
      process.exit(1);
    });
};

exports.connect = connect;