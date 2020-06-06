const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: 'You must provide a task!'
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Todo', todoSchema);
