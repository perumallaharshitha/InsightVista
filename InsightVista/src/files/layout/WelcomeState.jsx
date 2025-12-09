import React from "react";
import "../../pages/SalesOverview.css";

export default function WelcomeState({ onFileUpload }) {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Welcome to InsightVita 📊</h1>
        <p>Your sales data analytics dashboard. Visualize key performance indicators, track trends, and gain valuable customer and product insights.</p>
        <p>To begin, please upload your sales data file (e.g., JSON or CSV).</p>
        
        <label htmlFor="file-upload" className="upload-button">
          ⬆ Upload Sales Data
        </label>
        <input 
          id="file-upload" 
          type="file" 
          accept=".json,.csv" 
          onChange={handleFileSelect} 
          style={{ display: 'none' }} 
        />
        
        <p className="note">Note: For demonstration, a mock dataset will be loaded regardless of the file selected.</p>
      </div>
    </div>
  );
}
