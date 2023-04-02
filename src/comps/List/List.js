import React from "react";
import ListItem from "./ListItem";
import "./list.scss";

function TodoList(props) {
  return (
    <div className="TodoList">
      {props.todos.map((todo) => (
        <ListItem
          key={todo.id}
          todo={todo}
          onCompleteChange={props.onCompleteChange}
          onDelete={props.onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
