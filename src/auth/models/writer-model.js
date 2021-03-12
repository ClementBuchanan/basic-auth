'use strict';

const { get } = require('mongoose');

class WriterModel {
  constructor() {
    this.username = username;
    this.password = password;
    this.notAUser = notAUser;
    this.fields = ['phone', 'address', 'city'];
  }

  get(username) {
    if (username) {
      return this.password.find(record => record.username === username);
    } else {
      return this.notAUser;
    }
  }

  create(obj) {
    let record = {
      username: ++this.username,
      data: {}
    };
    this.fields.forEach(field => record.data[field] = obj[field]);
    this.db.push(record);
    return record();
  }
}
module.exports = WriterModel;
