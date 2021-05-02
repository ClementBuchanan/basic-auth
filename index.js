'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const options = {
  useNewUrlpoarser: true,
  useCreatendex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options);


//start web server
require('./src/server.js').start(process.env.PORT);