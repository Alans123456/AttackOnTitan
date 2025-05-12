import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Character from "./Pages/Character";
import Organization from "./Pages/Organization";
import Location from "./Pages/Location";
import Titan from "./Pages/Titan";
import Contact from "./Pages/Contact";
import Episode from "./Pages/Episode";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Character" element={<Character />} />
          <Route path="/Organization" element={<Organization />} />
          <Route path="/Location" element={<Location />} />
          <Route path="/Titan" element={<Titan />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Episode" element={<Episode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
