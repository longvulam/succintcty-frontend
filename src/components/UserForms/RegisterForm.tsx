import styles from "./UserForms.module.css";
import { useState } from "react";
import { requestRegistration } from "../../api/user.api";
import ThemedButton from "../ThemedButton/ThemedButton";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tryRegister = async () => {
    const res = await requestRegistration({ email: username, password });
    console.log(res);
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
    </div>
  )
}

export default RegisterForm;