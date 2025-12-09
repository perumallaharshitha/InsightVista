import React from "react";
import "./Navbar.css";

export default function Navbar() {

  const exportData = () => {
    alert("Export functionality coming soon!");
  };

  return (
    <nav className="navbar">
      <div className="nav-left"></div>

      <div className="nav-title">Insight<span>Vita</span></div>

      <div className="nav-actions">
        <button onClick={exportData} className="export-btn">
          ⬇ Export
        </button>
      </div>
    </nav>
  );
}
