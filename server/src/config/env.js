const DB_NAME = process.env.DB_NAME || 'grow_log';
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/';
const PORT = process.env.PORT || 5000;

exports.DB_NAME = DB_NAME;
exports.DB_URI = DB_URI;
exports.PORT = PORT;
