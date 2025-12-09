import React, { useState } from 'react';
import { useDataStore } from "../store/dataContext";
import { calculateDataSummary } from '../utils/dataProcessor';
import './TransformativeView.css'; 

export default function TransformationView({ onTransformAndLoad }) {
  const { rawUploadedData } = useDataStore();

  const summary = calculateDataSummary(rawUploadedData);
  const currentAvailableColumns = summary.columns.map(col => col.name);

  const [selectedColumns, setSelectedColumns] = useState(() => {
    return currentAvailableColumns.length > 0 ? currentAvailableColumns : [];
  });
  
  if (!rawUploadedData || rawUploadedData.length === 0) {
    return (
        <div className="transformation-view-empty">
            <p>Awaiting extracted data to display the Query Editor preview.</p>
        </div>
    );
  }
  
  const previewData = rawUploadedData.slice(0, 5);
  
  const handleColumnToggle = (columnName) => {
    setSelectedColumns(prev => 
      prev.includes(columnName)
        ? prev.filter(name => name !== columnName)
        : [...prev, columnName]
    );
  };
  
  const handleLoad = () => {
      onTransformAndLoad(selectedColumns); 
  }

  const noneSelected = selectedColumns.length === 0;

  return (
    <div className="transformation-view">

        <div className="column-selection-bar">
            {summary.columns.map(col => (
                <div 
                    key={col.name} 
                    className={`column-card ${selectedColumns.includes(col.name) ? 'selected' : ''}`}
                    onClick={() => handleColumnToggle(col.name)}
                >
                    <input 
                        type="checkbox" 
                        readOnly
                        checked={selectedColumns.includes(col.name)} 
                    />
                    <div className="column-name">{col.name}</div>
                    <span className={`data-type ${col.dataType.toLowerCase()}`}>{col.dataType}</span>
                </div>
            ))}
        </div>

        <div className="data-table-container">
          <table>
            <thead>
              <tr>
                {summary.columns
                  .filter(col => selectedColumns.includes(col.name))
                  .map(col => (
                      <th key={col.name}>{col.name}</th>
                  ))
                }
              </tr>
            </thead>
            
            <tbody>
              {previewData.map((row, index) => (
                <tr key={index}>
                  {summary.columns
                      .filter(col => selectedColumns.includes(col.name))
                      .map(col => (
                          <td key={col.name}>{row[col.name]}</td>
                      ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="preview-toolbar-bottom">
            <div className="selection-info">
                {selectedColumns.length} / {summary.columns.length} columns selected
            </div>
            <button 
                className="process-btn"
                onClick={handleLoad}
                disabled={noneSelected}
            >
                Load {selectedColumns.length} Columns
            </button>
        </div>

    </div>
  );
}
