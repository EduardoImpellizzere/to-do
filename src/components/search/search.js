import { useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import FilterOptions from "../filters/filterOptions";
import styles from "./search.module.css";

const Search = ({
  onSearch,
  onUpdateActiveFilter,
  onUpdateFilterImportant,
  isFilterImportantActive,
  activeFilter,
}) => {
  const inputProperties = {
    type: "text",
    placeHolderText: "Search a To-do...",
    maxLength: 50,
  };

  const [inputValue, setInputValue] = useState("");

  const handleFilterChange = () => {
    onUpdateFilterImportant();
  };

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    onSearch(inputValue);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          onChange={handleSearchInputChange}
          type={inputProperties.type}
          placeholder={inputProperties.placeHolderText}
          maxLength={inputProperties.maxLength}
          value={inputValue}
        />
      </div>
      <div className={styles.filterContainer}>
        <FilterOptions
          onUpdateActiveFilter={onUpdateActiveFilter}
          activeFilter={activeFilter}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <FormControlLabel
          control={
            <Checkbox
              onChange={handleFilterChange}
              checked={isFilterImportantActive}
            />
          }
          label="Important"
        />
      </div>
    </div>
  );
};

export default Search;
