import { Checkbox, FormControlLabel } from "@mui/material";
import styles from "./search.module.css";
import FilterOptions from "../filters/filterOptions";
import { useState } from "react";

const Search = ({ onFilter, activeFilter, wrapperSetActiveFilter }) => {
  const [filterImportant, setFilterImportant] = useState(false);

  const inputProperties = {
    type: "text",
    placeHolderText: "Search a To-do...",
    maxLength: 50,
  };

  const handleFilters = () => {
    setFilterImportant(!filterImportant);
    onFilter(filterImportant);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type={inputProperties.type}
          placeholder={inputProperties.placeHolderText}
          maxLength={inputProperties.maxLength}
        />
      </div>
      <div className={styles.filterContainer}>
        <FilterOptions
          onFilter={onFilter}
          filterImportant={filterImportant}
          activeFilter={activeFilter}
          wrapperSetActiveFilter={wrapperSetActiveFilter}
        />
      </div>
      <div className={styles.checkboxContainer}>
        <FormControlLabel
          control={
            <Checkbox checked={filterImportant} onChange={handleFilters} />
          }
          label="Important"
        />
      </div>
    </div>
  );
};

export default Search;
