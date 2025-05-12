import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Character from "./Pages/Character";
import Organization from "./Pages/Organization";
import Location from "./Pages/Location";
import Titan from "./Pages/Titan";
import Contact from "./Pages/Contact";
import Episode from "./Pages/Episode";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import PrivateRoute from "./Pages/PrivateRoute"; // Ensure the path is correct
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/Home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/Character"
          element={
            <PrivateRoute>
              <Character />
            </PrivateRoute>
          }
        />
        <Route
          path="/Organization"
          element={
            <PrivateRoute>
              <Organization />
            </PrivateRoute>
          }
        />
        <Route
          path="/Location"
          element={
            <PrivateRoute>
              <Location />
            </PrivateRoute>
          }
        />
        <Route
          path="/Titan"
          element={
            <PrivateRoute>
              <Titan />
            </PrivateRoute>
          }
        />
        <Route
          path="/Contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />
        <Route
          path="/Episode"
          element={
            <PrivateRoute>
              <Episode />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
