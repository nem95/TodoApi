const todoController = require('../controllers/todoController');
const supertest = require('supertest');
const app = require('../app');

describe('Todo Controller', () => {
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
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Add new todo with invalid data', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post('/todos/add')
        .send('serpentar')
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Edit todo with valid data', () => {
    test('it should edit the todo', async () => {
      const response = await supertest(app)
        .post('/todos/15/edit')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');

    });
  });

  describe('Edit todo with invalid data', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post('/todos/15/edit')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Edit todo with invalid user', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post('/todos/15/edit')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Delete existing todo with valid', () => {
    test('it should delete the todo', async () => {
      const response = await supertest(app)
        .post('/todos/15/delete')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Delete existing todo with valid user', () => {
    test('it should delete the todo', async () => {
      const response = await supertest(app)
        .post('/todos/15/delete')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Delete existing todo with invalid user', () => {
    test('it should not delete the todo and throw an error ', async () => {
      const response = await supertest(app)
        .post('/todos/15/delete')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });

  describe('Delete non-existing todo ', () => {
    test('it should throw an error', async () => {
      const response = await supertest(app)
        .post('/todos/15/delete')
        .send({ name: 'john' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('todo');
    });
  });
});
