const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

// Otherwise this was a really bad error we didn't expect! Shoot eh

if ( ['development', 'test'].includes(app.get('env'))) {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}
// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
