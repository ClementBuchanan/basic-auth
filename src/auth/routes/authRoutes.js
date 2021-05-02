'use strict';

const express = require('express');
const users = require('../models/users.js');
const basic = require('../middleware/basic.js');
const authRouter = express.Router();

const signup = async (req, res) => {
  const user = await new users(req.body);
  console.log(user);
  await user.save();
  res.status(201).send(user);
}

const signin = (req, res) => {
  res.status(200).send(req.user);
}
authRouter.post('/signup', signup);
authRouter.post('/signin', basic, signin);

module.exports = authRouter;
