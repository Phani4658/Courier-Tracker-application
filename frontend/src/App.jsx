import { Route,Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route exact path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
