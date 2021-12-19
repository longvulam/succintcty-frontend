import styles from "./Header.module.css";
import appLogo from "../../media/App_logo.png";
import { Alert, Box, Button, Modal, Snackbar, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import LoginForm from "../UserForms/LoginForm";
import RegisterForm from "../UserForms/RegisterForm";
import { useAppStore } from "../store/AppContext";
import { requestLogout, requestCurrentUser } from "../../api/user.api";

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


const logoutSuccessAlert = <Alert severity="success">
  {/* <AlertTitle>Success</AlertTitle> */}
  <strong>Logout Successful</strong>
</Alert>;


const logoutErrorAlert = <Alert severity="error">
  {/* <AlertTitle>Error</AlertTitle> */}
  <strong>Something wrong happened!</strong>
</Alert>;


enum UserFormMode {
  Login,
  Register
}

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAppStore();
  const [mode, setMode] = useState(UserFormMode.Login);
  const [isFormOpen, showForm] = useState(false);
  const [alert, setAlert] = useState(logoutSuccessAlert);
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await requestCurrentUser();
      if (!res?.data) {
        setIsLoggedIn(false);
        return;
      }

      const data = res?.data;
      if (data?.id && data?.email) {
        setIsLoggedIn(true);
      }

    }

    fetchCurrentUser();
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      showForm(false);
    }
  }, [isLoggedIn])

  const tryLogout = async () => {
    const res = await requestLogout();
    if (res === "200") {
      setAlert(logoutSuccessAlert);
      setIsLoggedIn(false);
    } else {
      setAlert(logoutErrorAlert);
    }
    setShowSnackBar(true);
  }

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={appLogo} alt="logo of Succinct" />

      <div className={styles.userButtonsContainer}>
        {isLoggedIn ?
          <Button variant="contained"
            className={styles.userFormBtn}
            onClick={tryLogout}
          >
            Logout
          </Button>
          : <>
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
          </>}
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={e => setShowSnackBar(false)}>
        {alert}
      </Snackbar>

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