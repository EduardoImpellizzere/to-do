import { Button, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./addToDoItem.module.css";
import { useState } from "react";

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
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
            type={inputProperties.type}
            placeholder={inputProperties.placeHolderText}
            maxLength={inputProperties.maxLength}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <Button
          variant="contained"
          color="warning"
          onClick={handleButtonClick}
          disabled={!inputValue}
        >
          {buttonText}
        </Button>
      </div>
      {inputValue && (
        <div className={styles.importantContainer}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isImportant}
                onChange={() => setIsImportant(!isImportant)}
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
