import React from "react";
import "./list.scss";
import "animate.css/animate.min.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
function TodoList(props) {
  const { todos, onCompleteChange, onDelete } = props;
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // if (todos.length === 0) {
  //   return (
  //     <p className="empty animate__animated animate__bounce  animate__infinite animate__slow">
  //       Empty!
  //     </p>
  //   );
  // }

  return (
    <div id="main-list">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div id="li-item">
              <Checkbox
                {...label}
                checked={todo.completed}
                color="secondary"
                onChange={() => onCompleteChange(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            </div>
            <div id="icon-list">
              <IconButton
                aria-label="delete"
                onClick={() => onDelete(todo.id)}
                color="error"
              >
                <DeleteIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
