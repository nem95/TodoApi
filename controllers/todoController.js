const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const { check, validationResult } = require('express-validator');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json({ todos });
};

exports.preValidateCreateTodo = [
  check('task').not().isEmpty().escape().withMessage('You must provide a task!'),
];

exports.validateCreateTodo = (req, res, next) => {
  const result = validationResult(req);

  if (result.errors.length > 0) {
    throw new Error(result.errors[0].msg)
  }

  next();
};

exports.createTodo = async (req, res) => {
  const todo = await new Todo(req.body);
  todo.save()

  res.json({ todo });
};
