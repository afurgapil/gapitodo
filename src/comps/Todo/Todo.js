import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./todo.scss";

function TodoForm(props) {
  const [newTodo, setNewTodo] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    };
    fetchQuote();
  }, []);
  function handleNewTodoChange(e) {
    setNewTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTodo.trim() === "") {
      return;
    }
    const todo = {
      id: uuidv4(),
      title: newTodo,
      completed: false,
    };
    props.onAddTodo(todo);
    setNewTodo("");
  }

  return (
    <div id="main-todo">
      <div id="quote-container">
        <p id="quote">{quote}</p>
        <p id="author">{`- ${author}`}</p>
      </div>
      <form onSubmit={handleSubmit} id="ToDoForm">
        <input
          type="text"
          value={newTodo}
          placeholder="New Todo"
          onChange={handleNewTodoChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TodoForm;
