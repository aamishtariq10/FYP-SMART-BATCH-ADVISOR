import React from "react";
import "../assets/Header.css";
import sc from "../assets/space.jpg";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div className="container">
      <header className="header">
        <h1>Welcome</h1>
      </header>
      <main className="main">
        <button onClick={() => navigate('/login')} className="center-btn">Click Me</button>
        <image src={sc} alt="Center Image" className="center-img" />
      </main>
    </div>
  );
};
export default Welcome;
