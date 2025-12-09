import React from "react";
import Kpi from "../cards/Kpi";

export default function DashboardState({ salesData }) {
  return (
    <div className="dashboard-grid">
      <h2>Sales Overview Dashboard</h2>

      <div className="filters-row">
        <p>Filters (DateRange, Region, etc. will go here)</p>
      </div>

      <div className="kpi-cards-row">
        <Kpi title="Total Sales" value="$1,234,567" />
        <Kpi title="Total Orders" value="5,432" />
        <Kpi title="Avg. Order Value" value="$227.27" />
      </div>

      <div className="chart-item full-width">
        <h3>Sales Trend (Line Chart)</h3>
      </div>

      <div className="chart-item half-width">
        <h3>Sales by Category (Bar Chart)</h3>
      </div>

      <div className="chart-item half-width">
        <h3>Sales by Region (Map/Bar)</h3>
      </div>

      <p className="data-note">Dashboard rendered with {salesData.length} records.</p>
    </div>
  );
}
