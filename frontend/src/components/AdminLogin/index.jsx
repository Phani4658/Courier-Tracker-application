import { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm";

function AdminLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const jwtToken = Cookies.get("admin_jwt_token");
  if (jwtToken) {
    return <Navigate to="/admin" replace />;
  }

  const onSuccessfulLogin = (jwtToken) => {
    Cookies.set("admin_jwt_token", jwtToken, { expires: 30 });
    navigate("/admin");
  };

  const onLoginFailure = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  const onClickLogin = async (username, password, event) => {
    event.preventDefault();
    const apiUrl = "https://courier-tracker-backend.onrender.com/admin/login";
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
        <div className="admin-left-part left-part">
          <img
            src="https://img.freepik.com/free-vector/business-people-working-with-data-computers_1262-19732.jpg?t=st=1708623817~exp=1708627417~hmac=20539443f36f00d7299cf8eeae36a1f3772a68db460d2d5a5ee32a8562dd2b2e&w=1380"
            alt="courier tracking"
          />
          <h2 className="login-form-heading">Manage your couriers with ease</h2>
          <p className="login-form-paragraph">
            Login Here and Manage all your couriers with ease
          </p>
        </div>
        <div className="admin-right-part right-part">
          <h1 className="login-account-heading">Admin Login</h1>
          <LoginForm errorMessage={errorMessage} loginUser={onClickLogin} />
          <button
            className="login-button outline-button"
            type="button"
            onClick={() => {
              navigate("/login");
            }}
          >
            User Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
