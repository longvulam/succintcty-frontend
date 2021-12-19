import styles from "./UserForms.module.css";
import { useState } from "react";
import { requestRegistration } from "../../api/user.api";
import { Alert, Snackbar } from '@mui/material';
import ThemedButton from "../ThemedButton/ThemedButton";

const registerationSuccessAlert = <Alert severity="success">
  {/* <AlertTitle>Success</AlertTitle> */}
  <strong>Registration Successfull</strong>
</Alert>;


const registrationErrorAlert = <Alert severity="error">
  {/* <AlertTitle>Error</AlertTitle> */}
  <strong>Something wrong happened!</strong>
</Alert>;

const RegisterForm = () => {
  const [alert, setAlert] = useState(registerationSuccessAlert);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tryRegister = async () => {
    const res = await requestRegistration({ email: username, password });
    if (res) {
      setAlert(registerationSuccessAlert);
    } else {
      setAlert(registrationErrorAlert);
    }
    setShowSnackBar(true);
  }

  return (
    <div className={styles.container}>
      <h3>Registration</h3>
      <form action="#" className={styles.form}>
        <p>
          <label htmlFor="username">username: </label>
          <input id="username" type="text" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </p>
        <p>
          <label htmlFor="password">password: </label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        </p>
        <ThemedButton onClick={tryRegister}>Submit</ThemedButton>
      </form>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={e => setShowSnackBar(false)}>
        {alert}
      </Snackbar>
    </div>
  )
}

export default RegisterForm;