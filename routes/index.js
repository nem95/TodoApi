const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { catchErrors } = require('../handlers/errorHandler');

router.get('/todos', catchErrors(todoController.getTodos));
router.post('/todos/add',
  todoController.preValidateTodo,
  todoController.validateCreateTodo,
  catchErrors(todoController.createTodo)
);
router.post('/todos/:id/edit',
  todoController.preValidateTodo,
  todoController.validateCreateTodo,
  catchErrors(todoController.updateTodo)
);

router.post('/todos/:id/delete', function (req, res) {
  res.send(`Delete post ${req.params.id}`);
});

module.exports = router;
