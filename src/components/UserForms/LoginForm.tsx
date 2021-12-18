import styles from "./LoginForm.module.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { requestLogin } from "../../api/user.api";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tryLogin = async () => {
    const res = await requestLogin({ email: username, password });
    console.log(res);
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
        <Button onClick={tryLogin}>Submit</Button>
      </form>
    </div>
  )
}

export default LoginForm;
