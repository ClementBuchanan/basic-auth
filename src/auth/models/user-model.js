'use strict';

const { get } = require("mongoose");

class UserModel {
  constructor() {
    this.username = username;
    this.password = password;
    this.notAUser = notAUser
  }
  get(username) {
    if(username) {
        return this.db.find(record => record.username === username);
    } else {
        return this.notAUser;
    }
}
module.exports = UserModel;
