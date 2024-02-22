import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  return (
    <nav>
      <h1 className="nav-heading">Courier Tracker</h1>
      {!(pathname !== "/admin" || pathname !== "/admin/login") && (
        <button
          className="admin-login"
          onClick={() => {
            navigate("/admin/login");
          }}
        >
          Admin Login
        </button>
      )}
    </nav>
  );
}

export default Navbar;
