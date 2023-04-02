import React from "react";
import ListItem from "./ListItem";
import "./list.scss";
import { useState, useRef, useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
function TodoList(props) {
  const [animationParent] = useAutoAnimate();
  const [todoCount, setTodoCount] = useState(props.todos.length);

  useEffect(() => {
    setTodoCount(props.todos.length);
  }, [props.todos]);

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
    <div className="TodoList" ref={animationParent}>
      <p>You have {todoCount} todos</p>
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
