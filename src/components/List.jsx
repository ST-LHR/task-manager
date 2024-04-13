import React from "react";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
const List = ({ task, updateTaskHandler, deleteTaskHandler }) => {
  return (
    <div>
      <li key={task.id}>
        <p className="flex justify-between text-white text-xl  items-center text-center  sm:mt-2">
          {task.completed ? (
            <Checkbox
              className=""
              defaultChecked
              onChange={() => updateTaskHandler(task)}
              size="medium"
            />
          ) : (
            <Checkbox onChange={() => updateTaskHandler(task)} size="medium" />
          )}

          {task.text}
          {task ? (
            <IconButton
              onClick={() => deleteTaskHandler(task)}
              aria-label="delete"
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          ) : null}
        </p>
      </li>
    </div>
  );
};

export default List;
