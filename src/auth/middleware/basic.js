'use strict';

const users = require('../models/users.js');
const base64 = require('base-64');


module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('no headers found');
  }
  const authPieces = req.headers.authorization.split(' ').pop();
  const [username, password] = base64.decode(authPieces).split(':');
  const [user] = await users.find({ username });

  if (!user) {
    next('User not found');
  }
  const validatedUser = await user.comparePasswords(password);

  if (validatedUser) {
    req.user = user
    next()
  }
  next('Invalid user')
}