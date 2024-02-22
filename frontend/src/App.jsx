import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import AddCourier from "./components/AddCourier";
import EditForm from "./components/EditForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/admin/add" element={<AddCourier />} />
        <Route exact path="/admin/couriers/:id" element={<EditForm />} />
      </Routes>
    </div>
  );
}

export default App;
