import React, { useState, useEffect } from "react";
import TodoForm from "../Todo/Todo";
import TodoList from "../List/List";
import "./Home.scss";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function Home() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const todoData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoData);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  async function addTodo(newTodo) {
    const todoRef = await addDoc(collection(db, "todos"), newTodo);
    setTodos([...todos, { id: todoRef.id, ...newTodo }]);
  }

  async function completeTodo(todo) {
    await updateDoc(doc(db, "todos", todo.id), {
      ...todo,
      completed: !todo.completed,
    });
    todo.completed = !todo.completed;
  }

  async function deleteTodo(todo) {
    await deleteDoc(doc(db, "todos", todo.id));
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
