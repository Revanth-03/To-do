import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div>
      <div
        className="Todo"
        onClick={() => {
          toggleComplete(task.id);
        }}
      >
        <p className={`${task.completed ? "completed" : ""}`}>{task.task}</p>
      </div>
      <div className="icons">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={task.completed ? "disabled" : ""}
          onClick={() => {
            if (!task.completed) {
              editTodo(task.id);
            }
          }}
        />

        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default Todo;
