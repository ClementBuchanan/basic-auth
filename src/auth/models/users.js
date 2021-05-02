'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username: { type: 'String', required: true, unique: true },
  password: { type: 'String', required: true }
})

userSchema.pre('save', async function () {
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function (password) {

  return bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('user', userSchema)