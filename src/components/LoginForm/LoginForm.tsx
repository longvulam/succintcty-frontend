import styles from "./LoginForm.module.css";
import { useState } from "react";


const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


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
      </form>
    </div>
  )
}

export default LoginForm;
