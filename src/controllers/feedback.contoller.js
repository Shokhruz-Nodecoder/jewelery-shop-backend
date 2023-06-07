const Io = require("../utils/io");
const GoFeedBack = new Io("./database/feedback.json");

const Feedback = require("../models/Feedback");
const { createFB } = require("../validations/fb.validation");

async function create(req, res) {
  const { userId } = req.user;

  const { namee, text } = req.body;
  const error = createFB({ namee, text });
  if (error) {
    return res.status(400).json({ message: error });
  }

  const todos = await GoFeedBack.read();
  const newFeedback = new Feedback(namee, text, userId);
  // console.log(newTodo)
  const data = todos.length ? [...todos, newFeedback] : [newFeedback];
  await GoFeedBack.write(data);
  res.status(201).json({ message: "todo created" });
}

async function getAll(req, res) {
  const { userId } = req.user;
  const todos = await GoFeedBack.read();
  const myTodos = todos.filter((todo) => todo.user_id === userId);
  res.status(200).json({ todos: myTodos });
}

module.exports = {
  getAll,
  create,
};
