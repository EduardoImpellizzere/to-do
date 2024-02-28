import { useState } from "react";
import { IconButton, Checkbox } from "@mui/material";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { FaExclamation, FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsExclamationSquare, BsExclamationSquareFill } from "react-icons/bs";
import styles from "./toDoItem.module.css";

const ToDoItem = ({ onEditTodo, onDeleteTodo, todo }) => {
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
    onEditTodo(todo.id, editedTodo);
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
    onEditTodo(todo.id, editedTodo);
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
    onDeleteTodo(todo.id);
  };

  return (
    <div className={styles.containerBox} onClick={handleContainerClick}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            value={editedText}
            autoFocus
            type={inputProperties.type}
            maxLength={inputProperties.maxLength}
          />
          <Checkbox
            onChange={handleCheckboxChange}
            onClick={(event) => event.stopPropagation()}
            checked={isImportant}
            icon={<BsExclamationSquare size={20} />}
            checkedIcon={<BsExclamationSquareFill size={20} color="orange" />}
            {...label}
          />
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleSaveClick();
            }}
          >
            <FaRegCheckCircle size={20} color="green" />
          </IconButton>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleCancelClick();
            }}
          >
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
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleEditClick();
            }}
          >
            <BsFillPencilFill size={18} />
          </IconButton>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteClick();
            }}
          >
            <BsFillTrashFill size={18} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default ToDoItem;
