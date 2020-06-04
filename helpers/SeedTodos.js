const faker = require('faker');
const mongoose = require('mongoose');
require('dotenv').config('../.env');

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

  return todos; //sentence
};

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  try {
    const todosDeleted = await Todo.deleteMany();
    console.log(todosDeleted.deletedCount);
    console.log('Data Deleted. ');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

async function seedData() {
  try {
    const todo = await Todo.insertMany(fakeTodos());
    console.log(app);
    process.exit();
  } catch (error) {
    console.log('erreur', error);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  // console.log(fakeTodos());
  seedData();
}

// var randomName = faker.name.findName(); // Rowan Nikolaus
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard(); // random contact card containing many properties
