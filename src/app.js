require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const database = require('./config/database');
const notFound = require('./middlewares/notFound');
const handleErrors = require('./middlewares/handleErrors');
const routes = require('./routes');

const configureExpress = () => {
  const app = express();

  app.use(helmet());

  app.use(bodyParser.json());

  app.use('/', routes);

  app.use(notFound);
  app.use(handleErrors);

  return app;
};

module.exports = () => database.connect().then(configureExpress);
