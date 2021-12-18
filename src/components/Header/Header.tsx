import styles from "./Header.module.css";
import appLogo from "../../media/App_logo.png";
import { Box, Button, Modal, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import LoginForm from "../UserForms/LoginForm";

const style: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Header = () => {
  const [loginFormOpen, showLoginForm] = useState(false);

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={appLogo} alt="logo of succinct" />

      <Button variant="contained"
        className={styles.loginFormBtn}
        onClick={() => showLoginForm(true)}
      >
        Login
      </Button>

      <Modal
        open={loginFormOpen}
        onClose={() => showLoginForm(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <LoginForm />
        </Box>
      </Modal>
    </div>
  )
}

export default Header;