const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { catchErrors } = require('../handlers/errorHandler');

router.get('/todos', catchErrors(todoController.getTodos));
router.post('/todos/add',
  todoController.preValidateCreateTodo,
  todoController.validateCreateTodo,
  catchErrors(todoController.createTodo)
);
router.post('/todos/:id/delete', function (req, res) {
  res.send(`Delete post ${req.params.id}`);
});
router.post('/todos/:id/edit&', function (req, res) {
  res.send(`Delete post ${req.params.id}`);
});

module.exports = router;
