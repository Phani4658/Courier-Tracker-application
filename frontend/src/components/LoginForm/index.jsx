/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";

function LoginForm({ errorMessage, loginUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(errorMessage);

  return (
    <form
      className="login-form"
      onSubmit={(event) => {
        loginUser(username, password, event);
      }}
    >
      <input
        type="text"
        value={username}
        placeholder="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <p className="error-msg">{errorMessage}</p>

      <button className="login-button" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
