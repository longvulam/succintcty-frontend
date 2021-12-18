import styles from "./Header.module.css";
import appLogo from "../../media/App_logo.png";

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={appLogo} alt="logo of succinct" />
    </div>
  )
}

export default Header;