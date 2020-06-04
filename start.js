/****

 Check the environement before starting the app

 ****/

const mongoose = require('mongoose');
// import environmental variables from our .env file
require('dotenv').config();

// Make sure we are running node 10+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 10 || (major === 10 && minor <= 21)) {
  console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
  process.exit();
}


// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all of our models

require('./models/Todo');
// require('./models/Store');

// Start our app!
const app = require('./app');
const port = process.env.PORT || 7777;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
