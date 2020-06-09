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
  todoController.preValidateTodoUpdate,
  todoController.validateCreateTodo,
  catchErrors(todoController.updateTodo)
);
router.post('/todos/:id/finish',
  todoController.preValidateTodoUpdate,
  todoController.validateCreateTodo,
  catchErrors(todoController.updateTodoStatus)
);

router.post('/todos/:id/delete', catchErrors(todoController.deleteTodo));

module.exports = router;
