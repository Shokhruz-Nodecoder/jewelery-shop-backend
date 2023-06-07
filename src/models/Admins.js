const { v4: uuid } = require("uuid");

class Admin {
  constructor(username, password) {
    this.id = uuid();
    this.username = username;
    this.password = password;
  }
}

module.exports = Admin;
