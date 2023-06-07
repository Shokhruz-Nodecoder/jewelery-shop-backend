const { v4: uuid } = require("uuid");

class FB {
  constructor(namee, text, user_id) {
    this.id = uuid();
    this.namee = namee
    this.text = text 
    this.user_id = user_id
   
  }
}

module.exports = FB;
