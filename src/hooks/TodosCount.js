import React, { useState, useEffect } from "react";

function TodosCount(props) {
  const [todoCount, setTodoCount] = useState(props.todosCount);

  useEffect(() => {
    setTodoCount(props.todosCount);
  }, [props.todosCount]);

  return <p>You have {todoCount} todos</p>;
}

export default TodosCount;
