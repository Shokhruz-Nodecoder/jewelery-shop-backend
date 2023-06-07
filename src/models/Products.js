const { v4: uuid } = require("uuid");

class Product {
  constructor(sort,cost,admin_id) {
    this.id = uuid();
    this.sort = sort;
    this.cost = cost;
    this.admin_id = admin_id;
   
  }
}

module.exports = Product;

