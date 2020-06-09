const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');
const { check, validationResult } = require('express-validator');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();

  res.json({ todos });
};

exports.preValidateTodo = [
  check('task').not().isEmpty().escape().withMessage('You must provide a task!'),
];

exports.preValidateTodoUpdate = [
  check('task').not().isEmpty().escape().withMessage('You must provide a task!'),
  check('isDone').isBoolean().withMessage('it should be from type BOOLEAN'),
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
  todo.save();

  res.json({ todo });
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true,
  }).exec();

  res.json({ todo });
};

exports.updateTodoStatus = async (req, res) => {
  // pas sûr de la technique, mais au moins on est sur d'avoir les valeurs de todo les plus a jours
  const todo = await Todo.findOne({ _id: req.params.id });

  const updateTodo = await Todo.findOneAndUpdate({ _id: req.params.id }, { isDone: !todo.isDone }, {
    new: true, // return the new store instead of the old one
    runValidators: true,
  }).exec();

  res.json({ updateTodo });
};

exports.deleteTodo = async (req, res) => {
  const deleteTodo = await Todo.findOneAndUpdate({ _id: req.params.id }, { isDeleted: true }, {
    new: true, // return the new store instead of the old one
    runValidators: true,
  }).exec();

  res.json({ message: "The todo was successfully deleted!" });
};
