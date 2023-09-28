import React, { useState } from "react";

const EditTodoForm = ({ editTask, task }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    if (value.length === 0) {
      editTask(task, task.id);
    }
    editTask(value, task.id);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      <button type="submit" className="todo-btn">
        Edit Task
      </button>
    </form>
  );
};

export default EditTodoForm;
