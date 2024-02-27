import ToDoItem from "./toDoItem";
import styles from "./toDoList.module.css";

const ToDoList = ({ todos, onEdit, onDelete, onComplete }) => {
  const emptyText = "Start adding some tasks";
  return (
    <div className={styles.listContainer}>
      {todos.map((todo) => (
        <ToDoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      {todos.length === 0 && (
        <span className={styles.emptyText}>{emptyText}</span>
      )}
    </div>
  );
};

export default ToDoList;
