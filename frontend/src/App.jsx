import { Route,Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
