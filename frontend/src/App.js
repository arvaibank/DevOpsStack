import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new TODO"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo({ todo, index, completeTodo, removeTodo }) {
  return <div className="todo"
              style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
  >
    {todo.text}
    <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>;
}

function App() {

  const [todos, setTodos] = useState();
  
  const fetchAllTasks = async () => {
    const res = await fetch('/api/tasks/all');
    const tasks = await res.json();
    setTodos(tasks);
  }

  useEffect(()=>{
    fetchAllTasks();
  }, [])

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {

  };

  const removeTodo = index => {

  };

  if (!todos) {
    return <div>Loading...</div>
  }
  return (
    <div className="app">
      {/* <TodoForm addTodo={addTodo} /> */}
        {todos.map((todo, index) => (
          <div className="todo-list">
          <div className="todo" id={index}>{todo.title}</div>
          <div className="todo" id={index}>{todo.description}</div>
          <div className="todo" id={index}>Due: {todo.dueDate}</div>
          <div className="todo" id={index}>Priority: {todo.priorityLevel}</div>
          <div className="todo" id={index}>Status: {todo.status}</div>
          </div>
        ))}
    </div>
  );
}

export default App;
