import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import AddCourier from "./components/AddCourier";
import EditForm from "./components/EditForm";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./components/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute />}>
          <Route exact path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="/admin/add" element={<AdminProtectedRoute />}>
          <Route exact path="/admin/add" element={<AddCourier />} />
        </Route>
        <Route path="/admin/couriers/:id" element={<AdminProtectedRoute />}>
          <Route exact path="/admin/couriers/:id" element={<EditForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
