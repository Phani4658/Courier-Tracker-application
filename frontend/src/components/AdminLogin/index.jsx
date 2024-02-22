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

  const onClickLogin = async (username, password,event) => {
    console.log(event);
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
            src="https://img.freepik.com/free-vector/dashboard-concept-illustration_114360-1447.jpg?t=st=1708623854~exp=1708627454~hmac=0bb030057d5cd4b7a7b632a670fd8a9b4bd6be59f4378f509556dc078f568f06&w=826"
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
