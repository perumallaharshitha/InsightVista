import { Routes, Route } from "react-router-dom";
import SalesOverview from "./pages/SalesOverview";
import CustomerInsights from "./pages/CustomerInsights";
import ProductPerformance from "./pages/ProductPerformance";
import DataPreparation from "./pages/DataPreparation";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/sales" element={<SalesOverview />} />
      <Route path="/customers" element={<CustomerInsights />} />
      <Route path="/products" element={<ProductPerformance />} />
      <Route path="/data-prep" element={<DataPreparation />} />
      <Route path="/" element={<SalesOverview />} />
    </Routes>
  );
}
