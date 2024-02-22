import { useNavigate } from "react-router-dom";
import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="button-container">
        <h1>Courier Tracker</h1>
        <button
          className="admin-button"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
