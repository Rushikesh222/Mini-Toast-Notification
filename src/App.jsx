import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { FirstPage } from "./page/FirstPage";
import { SecondPage } from "./page/SecondPage";
import { ThirdPage } from "./page/ThirdPage";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/third" element={<ThirdPage />} />
      </Routes>
      <footer>
        <p>Design by Rushikesh Shirsat</p>
      </footer>
    </div>
  );
}

export default App;
