import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const dataPrepItems = [
    { path: "/data-prep", icon: "🛠️", label: "Data Source & ETL" },
  ];
  
  const dashboardItems = [
    { path: "/sales", icon: "📊", label: "Sales Overview" },
    { path: "/customers", icon: "👥", label: "Customer Insights" },
    { path: "/products", icon: "📦", label: "Product Performance" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡" : "⬅"}
        </button>
      </div>

      {!collapsed && <h2 className="sidebar-section-heading">Data Source</h2>}
      <nav className="menu data-prep-menu">
        {dataPrepItems.map((item) => (
          <Link key={item.path} to={item.path} className="menu-item">
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <hr className="sidebar-divider" />

      {!collapsed && <h2 className="sidebar-section-heading">Dashboards</h2>}
      <nav className="menu dashboard-menu">
        {dashboardItems.map((item) => (
          <Link key={item.path} to={item.path} className="menu-item">
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
