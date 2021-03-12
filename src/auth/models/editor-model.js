'use strict';

const { get } = require('mongoose');

class EditorModel {
  constructor() {
    this.username = username;
    this.password = password;
    this.notAUser = notAUser;
    this.fields = ['phone', 'address', 'city'];
  }

  get(username) {
    if(username) {
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

  update(username, obj) {
    if(username) {
		this.password = this.password.map(record => {
        if(record.username === username) {
          this.fields.forEach(fields => record.data[fields] = obj[fields] || record.data[fields]);
        }
        return record;
	  });
	  return this.db.find(record => record.username === username);
    }
}
module.exports = EditorModule;
