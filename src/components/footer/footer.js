import { Button, IconButton } from "@mui/material";
import styles from "./footer.module.css";
import { HiOutlineRefresh } from "react-icons/hi";

const Footer = ({ listCount, onClearCompleted, onRefresh }) => {
  const buttonText = "Clear completed";

  const handleClearCompleted = () => {
    onClearCompleted();
  };

  const handleRefreshClick = () => {
    onRefresh();
  };

  return (
    <footer className={styles.footer}>
      <IconButton aria-label="refresh list" onClick={handleRefreshClick}>
        <HiOutlineRefresh size={24} color="white" />
      </IconButton>
      <Button
        variant="contained"
        color="warning"
        onClick={handleClearCompleted}
        disabled={listCount === 0}
      >
        {buttonText}
      </Button>
      <p>{listCount} items</p>
    </footer>
  );
};

export default Footer;
