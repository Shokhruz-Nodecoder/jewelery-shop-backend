const Io = require("../utils/io");
const bcrypt = require("bcrypt");
const GoProduct = new Io("./database/products.json");
const Admins = new Io("./database/admins.json");

const Product = require("../models/Products");
const { createPD } = require("../validations/product.validation");

async function create(req, res) {
//   const admins = await Admins.read();


  const { adminId } = req.admin;
  const { sort, cost } = req.body;
  const error = createPD({ sort,cost});
  if (error) {
    return res.status(400).json({ message: error });
  }

  const products = await GoProduct.read();
  const newProduct = new Product(sort, cost, adminId);

  const data = products.length ? [...products, newProduct] : [newProduct];

  await GoProduct.write(data);
  res.status(200).json({ message: "Product created successfully" });
}

const showProducts = async (req, res) => {
    const admins = await Admins.read();

    const findAdmin = admins.find((admin) => admin.username === username);
    const checkPassword = await bcrypt.compare(password, findAdmin.password);
    if (!checkPassword || !findAdmin)
      return res.status(403).json({ error: "Incorrect username or password" });
 
      const products = await GoProduct.read();
 
      res.status(200).json(products);
};

module.exports = {
  create,
  showProducts,
};



