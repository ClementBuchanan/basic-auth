'use strict';

const express = require('express');
const UsersModel = require('../models/user-model.js');
const users = new UsersModel();
const usersRouter = express.Router;

usersRouter.get('/users:username', getOneUsers);

function getOneUsers (req, res) {
  let userName = parseInt(req.params.username);
  let items = users.get(userName);
  res.status(200).json(items);
}
module.exports = UsersModel;
