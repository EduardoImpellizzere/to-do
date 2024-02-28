import ToDoItem from "./toDoItem";
import styles from "./toDoList.module.css";

const ToDoList = ({ onEditTodo, onDeleteTodo, todos }) => {
  const emptyText = "Start adding some tasks";
  return (
    <div className={styles.listContainer}>
      {todos.map((todo) => (
        <ToDoItem
          onEditTodo={onEditTodo}
          onDeleteTodo={onDeleteTodo}
          key={todo.id}
          todo={todo}
        />
      ))}
      {todos.length === 0 && (
        <span className={styles.emptyText}>{emptyText}</span>
      )}
    </div>
  );
};

export default ToDoList;
