import React from "react";
import ListItem from "./ListItem";
import "./list.scss";

function TodoList(props) {
  const sortedTodos = [...props.todos].sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else {
      return 0;
    }
  });

  const completedTodos = props.completedTodos.map((todo) => (
    <ListItem
      key={todo.id}
      todo={todo}
      onCompleteChange={props.onCompleteChange}
      onDelete={props.onDelete}
    />
  ));

  return (
    <div className="TodoList">
      {sortedTodos.map((todo) => (
        <ListItem
          key={todo.id}
          todo={todo}
          onCompleteChange={props.onCompleteChange}
          onDelete={props.onDelete}
        />
      ))}
      {completedTodos}
    </div>
  );
}

export default TodoList;
