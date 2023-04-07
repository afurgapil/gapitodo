import React, { useState, useEffect } from "react";
import "./todo.scss";
import { addDoc, collection } from "firebase/firestore";
import { db, app } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function TodoForm(props) {
  const [newTodo, setNewTodo] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (newTodo.trim() === "") {
      return;
    }
    const createdAt = Date.now();
    const userID = user.uid;
    const todo = {
      title: newTodo,
      completed: false,
      createdAt: createdAt,
      userID: userID,
    };
    await addDoc(collection(db, "todos"), todo);
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
