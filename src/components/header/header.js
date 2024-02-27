import styles from "./header.module.css";
import { Switch } from "@mui/material";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [themeCheck, setThemeCheck] = useState(false);

  const handleSwitchChange = () => {
    setThemeCheck(!themeCheck);
  };

  return (
    <header className={styles.header}>
      <h2>To-do List</h2>
      <div className={styles.themeContainer}>
        {themeCheck ? (
          <FaMoon color="white" size={18} />
        ) : (
          <FaSun color="white" size={18} />
        )}
        <Switch
          size="medium"
          color="secondary"
          checked={themeCheck}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </header>
  );
};

export default Header;
