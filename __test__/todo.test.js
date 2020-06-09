const supertest = require('supertest');
require('../start');
const app = require('../app');
const { seedData, deleteData } = require('../helpers/SeedTodos');

describe('Todo Controller', () => {
  beforeAll(async () => {
    await seedData();
  });

  afterAll(async () => {
    await deleteData();
  });

  describe('Fetch all todos', () => {
    test('it should return an object containing all the todos', async () => {

      const response = await supertest(app).get('/todos');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todos');
    });
  });

  describe('Add new todo with valid data', () => {
    test('it should add and return the new todo', async () => {
      const response = await supertest(app)
        .post('/todos/add')
        .send({ task: 'tester l\'api NodeJS' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Add new todo with invalid data', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post('/todos/add')
        .send()
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      // Pas très convaincu par ce text
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('You must provide a task!');
    });
  });

  describe('Edit todo with valid data', () => {
    test('it should edit the todo', async () => {
      const todo = await supertest(app)
        .post('/todos/add')
        .send({ task: 'tester l\'api NodeJS' })
        .set('Accept', 'application/json');

      const response = await supertest(app)
        .post(`/todos/${todo.body.todo._id}/edit`)
        .send({
          task: "tester api NodeJS Updated",
          isDone: false,
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo.task).toBe("tester api NodeJS Updated");
      expect(response.body.todo.isDone).toBe(false);
    });
  });

  describe('Edit todo with invalid data', () => {
    test('it should throw an error', async () => {
      const todo = await supertest(app)
        .post('/todos/add')
        .send({ task: 'tester l\'api NodeJS' })
        .set('Accept', 'application/json');

      const response = await supertest(app)
        .post(`/todos/${todo.body.todo._id}/edit`)
        .send()
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      // Pas très convaincu par ce text
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('You must provide a task!');
    });
  });

  describe('Edit todo with invalid id', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post(`/todos/invalidId/edit`)
        .send({
          task: 'test with invalid id, it should fail',
          isDone: false,
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      // Pas très convaincu par ce text
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Cast to ObjectId failed for value "invalidId" at path "_id" for model "Todo"');
    });
  });

  describe('Change todo Done status', () => {
    test('it should change the isDone status to true and send back the new todo', async () => {
      const todo = await supertest(app)
        .post('/todos/add')
        .send({ task: 'todo with status done' })
        .set('Accept', 'application/json');

      const response = await supertest(app)
        .post(`/todos/${todo.body.todo._id}/edit`)
        .send({
          task: todo.body.todo.task,
          isDone: true
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
      expect(response.body.todo.isDone).toBe(true);
    });
  });

  describe('Change todo Done statu with invalid data', () => {
    test('it should returrn an error', async () => {
      const todo = await supertest(app)
        .post('/todos/add')
        .send({ task: 'todo with status done' })
        .set('Accept', 'application/json');

      const response = await supertest(app)
        .post(`/todos/${todo.body.todo._id}/edit`)
        .send({
          task: todo.body.todo.task,
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      // Pas très convaincu par ce text
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('it should be from type BOOLEAN');
    });
  });

  describe('Delete existing todo', () => {
    test('it should delete the todo', async () => {
      const todo = await supertest(app)
        .post('/todos/add')
        .send({ task: 'todo with status done' })
        .set('Accept', 'application/json');

      const response = await supertest(app)
        .post(`/todos/${todo.body.todo._id}/delete`)
        .send({
          task: todo.body.todo.task,
        })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      // Pas très convaincu par ce text
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('The todo was successfully deleted!');
    });
  });

  describe('Delete non-existing todo ', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post(`/todos/invalidId/delete`)
        .send()

      expect(response.status).toBe(500);
      // Pas très convaincu par ce text
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Cast to ObjectId failed for value "invalidId" at path "_id" for model "Todo"');
    });
  });

  describe('Delete existing todo with valid user', () => {
    test('it should delete the todo', async () => {
      // add test
    });
  });

  describe('Delete existing todo with invalid user', () => {
    test('it should not delete the todo and throw an error ', async () => {
      // add test
    });
  });
});
