import styles from "./UserForms.module.css";
import { useState } from "react";
import { requestLogin } from "../../api/user.api";
import { Alert, Snackbar } from '@mui/material';
import { useAppStore } from "../store/AppContext";
import ThemedButton from "../ThemedButton/ThemedButton";

const loginSuccessAlert = <Alert severity="success">
  {/* <AlertTitle>Success</AlertTitle> */}
  <strong>Login Successfull</strong>
</Alert>;


const loginErrorAlert = <Alert severity="error">
  {/* <AlertTitle>Error</AlertTitle> */}
  <strong>User name or paswword are incorrect</strong>
</Alert>;


const LoginForm = () => {
  const { isLoggedIn, setIsLoggedIn } =  useAppStore();
  const [alert, setAlert] = useState(loginSuccessAlert);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tryLogin = async () => {
    const res = await requestLogin({ email: username, password: password });
    if (res) {
      setAlert(loginSuccessAlert);
      setIsLoggedIn(true);
    } else {
      setAlert(loginErrorAlert);
    }
    setShowSnackBar(true);
  }

  return (
    <div className={styles.container}>
      <h3>Login</h3>
      <form action="#" className={styles.form}>
        <p>
          <label htmlFor="username">username: </label>
          <input id="username" type="text" value={username} onChange={e => setUsername(e.currentTarget.value)} />
        </p>
        <p>
          <label htmlFor="password">password: </label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
        </p>
        <ThemedButton onClick={tryLogin}>Submit</ThemedButton>
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

export default LoginForm;
