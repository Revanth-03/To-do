import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
uuidv4();

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Function to add a new todo with a unique ID
  const addTodo = (todo) => {
    const newTodos = [
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
      ...todos,
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to toggle completion status and set completion timestamp
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            timestamp: todo.complete ? null : Date.now(),
          }
        : todo
    );

    // Sort the updatedTodos array based on completion status and timestamp
    newTodos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1; // a is completed, but b is not, so move a down
      } else if (!a.completed && b.completed) {
        return -1; // a is not completed, but b is, so move b down
      } else if (a.completed && b.completed) {
        return b.timestamp - a.timestamp; // Sort completed tasks by timestamp (most recent on top)
      } else {
        return 0; // Both are uncompleted, maintain their order
      }
    });
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to edit a todo
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to edit a task
  const editTask = (task, id) => {
    if (task.length === 0) {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      );
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    } else {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      );
      setTodos(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  };

  // Function to reset all todos and clear local storage
  const resetTodos = () => {
    const newTodos = [];
    setTodos(newTodos);
    localStorage.removeItem("todos");
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodo);
  }, []);

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} resetTodos={resetTodos} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTask={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
