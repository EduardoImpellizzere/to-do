import { useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./addToDoItem.module.css";

const AddToDoItem = ({ onAddTodo }) => {
  const buttonText = "+ Add task";
  const inputProperties = {
    type: "text",
    placeHolderText: "Enter To-do...",
    maxLength: 50,
  };
  const checkboxText = "Mark as important";

  const [inputValue, setInputValue] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButtonClick = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue !== "") {
      const newTask = {
        todoText: trimmedValue,
        completed: false,
        important: isImportant,
      };

      onAddTodo(newTask);

      setInputValue("");
    } else {
      console.log("Input cannot be blank spaces");
      setInputValue("");
    }
  };

  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <div className={styles.addContainer}>
          <input
            onChange={handleInputValueChange}
            value={inputValue}
            type={inputProperties.type}
            placeholder={inputProperties.placeHolderText}
            maxLength={inputProperties.maxLength}
          />
        </div>
        <Button
          onClick={handleAddButtonClick}
          disabled={!inputValue}
          variant="contained"
          color="warning"
        >
          {buttonText}
        </Button>
      </div>
      {inputValue && (
        <div className={styles.importantContainer}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => setIsImportant(!isImportant)}
                checked={isImportant}
              />
            }
            label={checkboxText}
          />
        </div>
      )}
    </div>
  );
};

export default AddToDoItem;
