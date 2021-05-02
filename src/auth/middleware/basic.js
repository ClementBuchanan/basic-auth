'use strict';

const users = require('../models/users.js');
const base64 = require('base-64');


module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next('no headers found');
  }
  console.log()
  const authPieces = req.headers.authorization.split(' ').pop();
  const [username, password] = base64.decode(authPieces).split(':');
  console.log(username, password);
  const [user] = await users.find({ username });

  if (!user) {
    return next('User not found');
  }
  const validatedUser = await user.comparePasswords(password);

  if (validatedUser) {
    req.user = user
    return next()
  }
  return next('Invalid user')
}