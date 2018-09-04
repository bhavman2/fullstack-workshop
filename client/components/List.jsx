import React, { Component } from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      todos: []
    }
    this.updateText = this.updateText.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }

  updateText(e) {
    this.setState({
      todo: e.target.value
    });
  }

  addTodo() {
    axios.post('/api/todo', {
      todo: this.state.todo
    })
      .then(
        this.getTodos(),
        console.log("Added todo")
      ).catch(err => { console.log("Error") });
  }

  getTodos() {
    axios.get('/api/todo')
      .then(results => {
        console.log(results.data);
        this.setState({
          todos: results.data
        });
      })
      .catch(err => console.log(err));
  }

  editTodo(todoID) {
    new Promise((resolve, reject) => {
      var todo = prompt("Enter in a new todo: ")
      if (!todo) {
        reject();
      } else {
        resolve(todo);
      }
    }).then(todo => {
      axios.put('/api/todo', {
        todoID: todoID,
        todo: todo
      })
        .then(
          console.log("Edited successfully"),
          this.getTodos()
        ).catch(err => console.log('Error updating todo in the DB'));
    }).catch(err => console.log('Error editing todo', err));
  }

  deleteTodo(todoID) {
    axios.delete('/api/todo', {
      params: { todoID: todoID }
    })
      .then(
        console.log('Deleted Successfully'),
        this.getTodos()
      ).catch(err => console.log('Error deleting todo', err));
  }

  render(props) {
    return (
      <div>
        Enter todo:
        <br></br>
        <input type="text" onKeyUp={this.updateText}></input>
        <br></br>
        <button onClick={this.addTodo}>Add</button>
        <hr />
        {this.state.todos.map((todo) => {
          return <ListEntry key={todo._id} todo={todo} delete={this.deleteTodo.bind(this, todo._id)} edit={this.editTodo.bind(this, todo._id)} />
        })}
      </div>
    );
  }
}

export default List;