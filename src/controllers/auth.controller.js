const Io = require("../utils/io");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { authValidation } = require("../validations/validation");
const jwt = require("../utils/jwt");

const Users = new Io("./database/users.json");

async function register(req, res) {
  const { username, password } = req.body;

  const error = authValidation({ username, password });

  if (error) {
    return res.status(400).json({ message: error });
  }
  const users = await Users.read();

  const findUser = users.find((user) => user.username === username);
  if (findUser) return res.status(403).json({ error: "User already exists" });

  const hashingPass = await bcrypt.hash(password, 10);

  const newUser = new User(username, hashingPass);
  const data = users.length ? [...users, newUser] : [newUser];
  await Users.write(data);

  const token = jwt.sign({ userId: newUser.id });
  

  res.status(200).json({ message: "Success", data: token });
}

async function login(req, res) {
    const { username, password } = req.body;

  const error = authValidation({ username, password });

  if (error) {
    return res.status(403).json({ message: error });
  }
  const users = await Users.read();

  const findUser = users.find((user) => user.username === username);
  if (!findUser) return res.status(403).json({ error: "Incorrect username or password" });


const checkPassword = await bcrypt.compare(password, findUser.password);
if(!checkPassword) return res.status(403).json({ error: "Incorrect username or password" });


const token = jwt.sign({ userId: findUser.id });

res.status(200).json({ message: "Success", data: token });

}

module.exports = {
  register,
  login,
};
