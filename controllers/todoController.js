const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json({ todos });
};
