import React from "react";
import "./list.scss";
import "animate.css/animate.min.css";

function TodoList(props) {
  const { todos, onCompleteChange, onDelete } = props;

  if (todos.length === 0) {
    return (
      <p className="empty animate__animated animate__bounce  animate__infinite animate__slow">
        Empty!
      </p>
    );
  }

  return (
    <div id="main-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onCompleteChange(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => onDelete(todo.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
