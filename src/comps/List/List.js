import React, { useRef } from "react";
import ListItem from "./ListItem";
import "./list.scss";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import TodosCount from "../../hooks/TodosCount";

function TodoList(props) {
  const [animationParent] = useAutoAnimate();

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
      {/* <TodosCount todosCount={props.todos.length} /> */}
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
