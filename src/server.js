'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


//other respources
const errorHandler = require('./middleware/error-handlers/500.js');
const notFound = require('./middware/error-handlers/404.js');
const authRoutes = require('./routes/authentication.js');

//express app
const app = express();

//app level middleware
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(authRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  },
};