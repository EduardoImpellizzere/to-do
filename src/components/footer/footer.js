import { Button, IconButton } from "@mui/material";
import { HiOutlineRefresh } from "react-icons/hi";
import styles from "./footer.module.css";

const Footer = ({ onRefresh, onClearCompleted, listCount }) => {
  const buttonText = "Clear completed";

  const handleClearCompleted = () => {
    onClearCompleted();
  };

  const handleRefreshClick = () => {
    onRefresh();
  };

  return (
    <footer className={styles.footer}>
      <IconButton onClick={handleRefreshClick} aria-label="refresh list">
        <HiOutlineRefresh size={24} color="white" />
      </IconButton>
      <Button
        onClick={handleClearCompleted}
        disabled={listCount === 0}
        variant="contained"
        color="warning"
      >
        {buttonText}
      </Button>
      <p>{listCount} items</p>
    </footer>
  );
};

export default Footer;
