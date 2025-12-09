import React, { useState } from 'react';
import { DataContext, initialFilters } from './dataContext';

export const DataProvider = ({ children }) => {
  const [salesData, setSalesData] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [rawUploadedData, setRawUploadedData] = useState(null);

  const loadData = (data) => {
    setSalesData(data);
    setIsDataLoaded(true);
  };

  const saveRawData = (data) => {
    setRawUploadedData(data);
    setFilters(prev => ({ ...prev, etlStatus: 'RAW_DATA_READY' }));
  };

  const store = {
    rawUploadedData,
    saveRawData,
    salesData,
    filters,
    isDataLoaded,
    setFilters,
    loadData,
  };

  return (
    <DataContext.Provider value={store}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
