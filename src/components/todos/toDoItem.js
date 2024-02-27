import { IconButton, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./toDoItem.module.css";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaExclamation, FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsExclamationSquare, BsExclamationSquareFill } from "react-icons/bs";
import { useState } from "react";

const ToDoItem = ({ todo, onEdit, onDelete }) => {
  const { todoText, completed, important } = todo;

  const inputProperties = {
    type: "text",
    maxLength: 50,
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todoText);
  const [isImportant, setImportant] = useState(important);

  const handleContainerClick = () => {
    const editedTodo = { ...todo, completed: !completed };
    onEdit(todo.id, editedTodo);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const editedTodo = {
      ...todo,
      todoText: editedText,
      important: isImportant,
    };
    onEdit(todo.id, editedTodo);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(todoText);
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleCheckboxChange = () => {
    setImportant(!isImportant);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveClick();
    }
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <div className={styles.containerBox}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type={inputProperties.type}
            maxLength={inputProperties.maxLength}
            value={editedText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            autoFocus
          />
          <Checkbox
            {...label}
            checked={isImportant}
            onChange={handleCheckboxChange}
            onClick={(event) => event.stopPropagation()}
            icon={<BsExclamationSquare size={20} />}
            checkedIcon={<BsExclamationSquareFill size={20} color="orange" />}
          />
          <IconButton onClick={handleSaveClick}>
            <FaRegCheckCircle size={20} color="green" />
          </IconButton>
          <IconButton onClick={handleCancelClick}>
            <FaTimesCircle size={20} color="red" />
          </IconButton>
        </div>
      ) : (
        <div
          style={{ textDecoration: completed ? "line-through" : "none" }}
          className={styles.todoItem}
        >
          <div className={styles.importantIcon}>
            {important && <FaExclamation color="orange" />}
          </div>
          <span>{todoText}</span>
        </div>
      )}
      {!isEditing && (
        <div className={styles.buttonsContainer}>
          <IconButton onClick={handleEditClick}>
            <BsFillPencilFill size={18} />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <BsFillTrashFill size={18} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
