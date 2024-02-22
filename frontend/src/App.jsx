import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import AddCourier from "./components/AddCourier";
import EditForm from "./components/EditForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/admin/add" element={<AddCourier />} />
        <Route exact path="/admin/couriers/:id" element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;
