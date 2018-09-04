const { Todo } = require('../database/index.js')

module.exports = {
  post: (req, res) => {
    var todo = req.body.todo;
    Todo.create({ todo: todo }, function (err, small) {
      if (err) {
        console.log(err);
      } else {
        res.status(201).send('Sucess');
      }
    });
  },

  get: (req, res) => {
    Todo
      .find({})
      .select('todo')
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(docs);
        }
      })
  },
  put: (req, res) => {
    var { todo, todoID } = req.body;
    Todo
      .findOneAndUpdate({ _id: todoID }, { $set: { todo: todo } })
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send('Success');
        }
      })
  },
  delete: (req, res) => {
    var { todoID } = req.query;
    Todo
      .findByIdAndRemove(todoID)
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send('Success')
        }
      })
  }
} 