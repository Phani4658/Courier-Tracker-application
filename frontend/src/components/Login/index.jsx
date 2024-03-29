import { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken) {
    return <Navigate to="/" replace />;
  }

  const onSuccessfulLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });

    navigate("/");
  };

  const onLoginFailure = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  const onClickLogin = async (username, password, event) => {
    event.preventDefault();

    const apiUrl = "https://courier-tracker-backend.onrender.com/login";
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
      <div className="login-form-container">
        <div className="left-part">
          <img
            src="https://img.freepik.com/free-vector/earth-globe-with-pointers-delivery-meeting-business-people_1262-19240.jpg?t=st=1708619118~exp=1708622718~hmac=4b90cc5960a60c97824056dff12c48d57b17dd0aacbfcdd63ddbc8c28ee3268b&w=1380"
            alt="courier tracking"
          />
          <h2 className="login-form-heading">Track your couriers with ease</h2>
          <p className="login-form-paragraph">
            Login Here and Track all your couriers with ease
          </p>
        </div>
        <div className="right-part">
          <h1 className="login-account-heading">User Login</h1>
          <LoginForm errorMessage={errorMessage} loginUser={onClickLogin} />
          <button
            className="login-button outline-button"
            type="button"
            onClick={() => {
              navigate("/admin/login");
            }}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
