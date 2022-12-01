require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const env = require('./config/env');
const db = require('./config/db');
const app = require('./server');

// start server once there is a database connection
db.connect().then(() => {
  app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));
});