import React, { useState } from 'react';
import PageWrapper from '../files/layout/PageWrapper';
import TransformationView from '../dataPrep/TransformativeView';
import { useDataStore } from '../store/dataContext';
import { processCSVData, finalizeTransformation } from '../utils/dataProcessor';
import { useNavigate } from 'react-router-dom';
import './DataPreparation.css';

const ETL_STATUS = {
    INITIAL: 'INITIAL',
    RAW_DATA_READY: 'RAW_DATA_READY',
    DATA_LOADED: 'DATA_LOADED',
};

export default function DataPrep() {
  const { filters, rawUploadedData, saveRawData, loadData } = useDataStore();
  const navigate = useNavigate();
  
  const [uploadFile, setUploadFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const etlStatus = filters.etlStatus;

  const handleFileChange = (event) => setUploadFile(event.target.files[0]);

  const handleExtract = async () => {
    if (!uploadFile) return;
    setIsProcessing(true);
    try {
      const rawData = await processCSVData(uploadFile);
      saveRawData(rawData);
    } catch (error) {
      alert(`Extraction Error: ${error.message}`);
      saveRawData(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransformAndLoad = async (selectedColumns) => {
    setIsProcessing(true);
    try {
      const finalData = await finalizeTransformation(rawUploadedData, selectedColumns);
      loadData(finalData);
      navigate('/sales');
    } catch (error) {
      alert(`Transformation Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartNewUpload = () => saveRawData(null);

  return (
    <PageWrapper>
      <div className="dp-page">
        {etlStatus === ETL_STATUS.INITIAL && (
          <div className="dp-card dp-extract">
            <h2>Upload Sales Data</h2>
            <p>Please upload your CSV file to start the ETL process.</p>
            <input type="file" accept=".csv" onChange={handleFileChange} disabled={isProcessing} />
            <button 
              className="dp-btn primary" 
              onClick={handleExtract} 
              disabled={!uploadFile || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Extract Data'}
            </button>
            <span className="dp-status">Current Stage: INITIAL</span>
          </div>
        )}

        {etlStatus === ETL_STATUS.RAW_DATA_READY && (
          <div className="dp-card dp-transform">
            <h2>Inspect & Load Data</h2>
            <p>Select the columns you want to include in your final dataset.</p>
            <TransformationView onTransformAndLoad={handleTransformAndLoad} />
            <span className="dp-status">Current Stage: RAW DATA READY</span>
          </div>
        )}

        {etlStatus === ETL_STATUS.DATA_LOADED && (
          <div className="dp-card dp-loaded">
            <h2>Data Loaded Successfully</h2>
            <p>{rawUploadedData?.length || filters.salesData.length} records ready for analysis.</p>
            <div className="dp-actions">
              <button className="dp-btn primary" onClick={() => navigate('/sales')}>Go to Dashboard</button>
              <button className="dp-btn secondary" onClick={handleStartNewUpload}>Upload New File</button>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="dp-loading-overlay">
            <p className="dp-loading-message">
              {etlStatus === ETL_STATUS.INITIAL ? 'Extracting Data...' : 'Applying Transformations...'}
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
