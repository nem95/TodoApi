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

exports.finishTodo = async (req, res) => {
  // const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //   new: true, // return the new store instead of the old one
  //   runValidators: true,
  // }).exec();

  res.json({ todo: "dede" });
};

exports.deleteTodo = async (req, res) => {
  // const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //   new: true, // return the new store instead of the old one
  //   runValidators: true,
  // }).exec();

  res.json({ todo: "dede" });
};
