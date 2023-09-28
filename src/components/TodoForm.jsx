import React, { useState } from "react";

const TodoForm = ({ addTodo, resetTodos }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clear value after submission
      setValue("");
    }
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
        Add Task
      </button>
      <button className="reset-button" onClick={resetTodos}>
        Reset
      </button>
    </form>
  );
};

export default TodoForm;
