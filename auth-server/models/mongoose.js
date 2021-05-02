'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base64');
const mongoose = require('mongoose');

//process JSON input and put the data into req.body
app.use(express.json());

//process FORM input and put the data into req.body
app.use(express.urlencoded({ extended: true }));

//create mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

