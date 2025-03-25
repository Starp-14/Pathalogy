import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import Status from "./components/StatusPage/Status";
import Report from "./components/Report/Report";
import Prescription from "./components/Prescription/Prescription";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <>
      <div>
        {/* Conditionally render Navbar based on the current route */}
        {location.pathname !== "/login" && location.pathname !== "/register" && <Navbar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home email={email} />} />
          <Route path="/status" element={<Status />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/prescription/:id" element={<Prescription />} />
        </Routes>
      </div>
    </>
  );
}

export default App;