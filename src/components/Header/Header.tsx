import styles from "./Header.module.css";
import appLogo from "../../media/App_logo.png";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={appLogo} alt="logo of succinct" />

      <Button variant="contained" className={styles.loginFormBtn}>LoginButton</Button>
    </div>
  )
}

export default Header;