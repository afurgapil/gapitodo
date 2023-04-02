import React from "react";
import "./listitem.scss";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

function ListItem(props) {
  const handleCompleteChange = () => {
    props.onCompleteChange(props.todo);
  };

  function handleDelete() {
    props.onDelete(props.todo);
  }

  return (
    <div className="ListItem">
      <Checkbox
        checked={props.todo.completed}
        onChange={handleCompleteChange}
        color="primary"
        size="large"
      />
      <p className={props.todo.completed ? "completed" : null}>
        {props.todo.title}
      </p>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete
      </Button>
    </div>
  );
}

export default ListItem;
