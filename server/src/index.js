require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const app = require('./server');
const dbo = require('./dbo');

const port = process.env.PORT || 5000;

dbo.connect().then(() => {
  console.log(`Connected to database`);
  // start server once there is a database connection
  app.listen(port, () => console.log(`Server is running on port: ${port}`));
});