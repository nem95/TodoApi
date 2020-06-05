const faker = require('faker');
const mongoose = require('mongoose');
const envPath = process.env.NODE_ENV ? { path: './testVariables.env'} : '../.env';

require('dotenv').config(envPath);

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Todo = require('../models/Todo');

function fakeTodos() {
  const todos = [...Array(10)].map(item => {
    return  {
      task: faker.hacker.phrase(),
      isDone: faker.random.boolean(),
      isDeleted: faker.random.boolean(),
      createdAt: faker.date.recent()
    }
  });
  console.log(todos);

  return todos;
};

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  try {
    const todosDeleted = await Todo.deleteMany();
    console.log(todosDeleted.deletedCount);
    console.log('Data Deleted. ');
  } catch (error) {
    console.error(error);
  }
  return;
};

async function seedData() {
  try {
    const todo = await Todo.insertMany(fakeTodos());
    console.log(todo);
  } catch (error) {
    console.log('erreur', error);
  }
  return;
}

// check if node env isn't test
if (process.env.NODE_ENV !== 'test') {
  if (process.argv.includes('--delete')) {
    deleteData();
    process.exit();
  } else {
    seedData();
    process.exit();
  }
}

module.exports = { seedData, deleteData };
