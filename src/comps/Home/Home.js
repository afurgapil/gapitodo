import React, { useState, useEffect } from "react";
import TodoForm from "../Todo/Todo";
import TodoList from "../List/List";
import "./Home.scss";
import { getAuth } from "firebase/auth";
function Home() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);
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
    <div>
      {user ? (
        <div id="onLoginHome">
          <div className="app">
            <TodoForm onAddTodo={addTodo} />
            <TodoList
              todos={todos}
              onCompleteChange={completeTodo}
              onDelete={deleteTodo}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
