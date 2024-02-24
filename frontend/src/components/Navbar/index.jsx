import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";

function Navbar() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("admin_jwt_token");
    navigate("/admin/login");
  };
  return (
    <nav>
      <div className="button-container">
        <h1>Courier Tracker</h1>
        <div>
          <button
            className="admin-button"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </button>
          <button className="admin-button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
