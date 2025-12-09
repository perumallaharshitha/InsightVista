import React from "react";
import PageWrapper from "../files/layout/PageWrapper";
import DashboardState from "../files/layout/DashboardState";
import { useDataStore } from "../store/dataContext";
import "./SalesOverview.css";

export default function SalesOverview() {
  const { salesData, isDataLoaded } = useDataStore();

  let content;
  
  if (!isDataLoaded) {
    content = (
      <div className="empty-state-message">
        <h1>Data Not Loaded</h1>
        <p>Please go to the Data Source & ETL page in the sidebar to upload and process your sales data.</p>
        <a href="/data-prep" className="load-data-link">
          Go to Data Preparation 🛠️
        </a>
      </div>
    ); 
  } else if (salesData.length === 0) {
    content = <div className="error-message">Loaded sales data is empty.</div>;
  } else {
    content = <DashboardState salesData={salesData} />;
  }

  return (
    <PageWrapper>
      <div className="sales-overview">
        {content}
      </div>
    </PageWrapper>
  );
}
