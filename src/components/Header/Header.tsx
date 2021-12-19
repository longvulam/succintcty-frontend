import styles from "./Header.module.css";
import appLogo from "../../media/App_logo.png";
import { Box, Button, Modal, SxProps, Theme } from "@mui/material";
import { useState } from "react";
import LoginForm from "../UserForms/LoginForm";
import RegisterForm from "../UserForms/RegisterForm";

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

enum UserFormMode {
  Login,
  Register
}

const Header = () => {
  const [mode, setMode] = useState(UserFormMode.Login);
  const [isFormOpen, showForm] = useState(false);

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={appLogo} alt="logo of Succinct" />

      <div className={styles.userButtonsContainer}>
        <Button variant="contained"
          className={styles.userFormBtn}
          onClick={() => {
            setMode(UserFormMode.Login);
            showForm(true);
          }}
        >
          Login
        </Button>

        <Button variant="contained"
          className={styles.userFormBtn}
          onClick={() => {
            setMode(UserFormMode.Register);
            showForm(true);
          }}
        >
          Register
        </Button>
      </div>

      <Modal
        open={isFormOpen}
        onClose={() => showForm(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          {mode === UserFormMode.Login && <LoginForm />}
          {mode === UserFormMode.Register && <RegisterForm />}
        </Box>
      </Modal>
    </div>
  )
}

export default Header;