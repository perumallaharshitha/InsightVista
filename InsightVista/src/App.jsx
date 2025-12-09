import React from "react";
import Sidebar from "./files/layout/Sidebar";
import Navbar from "./files/layout/Navbar";
import AppRouter from "./router";

export default function App() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="page-wrapper">
        <AppRouter />
      </div>
    </>
  );
}
