import React, { useState, useEffect } from "react";
import TodoForm from "../Todo/Todo";
import TodoList from "../List/List";
import "./Home.scss";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(newTodo) {
    setTodos([...todos, newTodo]);
  }

  function completeTodo(id) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  }

  function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div className="app">
      <h1 id="tittle">Gapil ToDo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onCompleteChange={completeTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default Home;
