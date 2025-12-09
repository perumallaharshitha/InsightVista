import { createContext, useContext } from 'react';

export const DataContext = createContext(null);

export const initialFilters = {
    etlStatus: 'INITIAL', 
};

export const useDataStore = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataStore must be used within a DataProvider');
  }
  return context;
};
