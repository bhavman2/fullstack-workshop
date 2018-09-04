const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/TODO", { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', console.error.bind(console, 'db connected'));

const todoSchema = mongoose.Schema({
  todo: { type: String, require: true },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };