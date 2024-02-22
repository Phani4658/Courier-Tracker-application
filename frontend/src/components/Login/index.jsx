import { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const onSuccessfulLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    console.log(jwtToken);
    pathname === "/login" ? navigate("/") : navigate("/admin");
  };

  const onLoginFailure = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    const apiUrl =
      pathname === "/login"
        ? "http://localhost:3015/login"
        : "http://localhost:3015/admin/login";
    const userDetails = {
      username,
      password,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data.token);
        onSuccessfulLogin(data.token);
      } else {
        onLoginFailure(data.message);
      }
    } catch (e) {
      onLoginFailure(e.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-form-container">
        <form className="login-form">
          <h1 className="login-heading">
            {pathname === "/login" ? "Login" : "Admin Login"}
          </h1>
          <div className="input-field-container">
            <label>Username</label> <br />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input-field-container">
            <label>Password</label> <br />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="error-msg">{errorMessage}</p>
          </div>

          <button className="login-button" onClick={onClickLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
