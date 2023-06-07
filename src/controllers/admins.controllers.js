const Io = require("../utils/io");
const Admin = require("../models/Admins");
const bcrypt = require("bcrypt");
const { AdminValidation } = require("../validations/adminvalid");
const jwt = require("../utils/jwt");
const Admins = new Io("./database/admins.json");

async function register(req, res) {
  const { username, password } = req.body;

  const error = AdminValidation({ username, password });

  if (error) {
    return res.status(400).json({ message: error });
  }
  const admins = await Admins.read();

  const findAdmin = admins.find((admin) => admin.username === username);
  if (findAdmin) return res.status(403).json({ error: "User already exists" });

  const hashingPass = await bcrypt.hash(password, 10);

  const newAdmin = new Admin(username, hashingPass);

  const data = admins.length ? [admins, newAdmin] : [newAdmin];

  await Admins.write(data);

  const token = jwt.sign({ adminId: newAdmin.id });

  return res.status(201).json({ message: "Success", data: token });
}


async function login(req, res) {
    const { username, password } = req.body;

    const error = AdminValidation({ username, password });
  
    if (error) {
      return res.status(400).json({ message: error });
    }
    const admins = await Admins.read();
  
    const findAdmin = admins.find((admin) => admin.username === username);
    if (!findAdmin) return res.status(403).json({ error: "Incorrect username or password" });
  
    const checkPassword = await bcrypt.compare(password, findAdmin.password);
if(!checkPassword) return res.status(403).json({ error: "Incorrect username or password" });


    const token = jwt.sign({ adminId: findAdmin.id });
    return res.status(200).json({ message: "Success", data: token });

}


module.exports = {
    register,
    login
}
  