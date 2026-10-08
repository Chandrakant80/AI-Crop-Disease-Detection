import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  loadDataset,
  filterDataset,
  calculateStatistics,
  prepareChartData,
  resetToDefaultDataset,
  setActiveDataset as setServiceActiveDataset
} from '../services/dataService';

const DatasetContext = createContext();

const initialFilters = {
  search: '',
  crop: 'All',
  disease: 'All',
  severity: 'All',
  status: 'All',
  split: 'All',
  minConfidence: 0
};

export const DatasetProvider = ({ children }) => {
  const [rawData, setRawData] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [datasetMeta, setDatasetMeta] = useState({
    name: 'Plant Pathology AI Benchmark v2.4',
    isCustom: false,
    lastUpdated: new Date().toLocaleTimeString()
  });

  // Load initial dataset
  const fetchDataset = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await loadDataset();
      setRawData(data);
    } catch (err) {
      setError('Failed to load crop disease dataset.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataset();
  }, []);

  // Filtered dataset whenever rawData or filters change
  const filteredData = useMemo(() => {
    return filterDataset(rawData, filters);
  }, [rawData, filters]);

  // High-level statistics
  const stats = useMemo(() => {
    return calculateStatistics(filteredData.length > 0 || Object.values(filters).some(v => v !== 'All' && v !== '' && v !== 0) ? filteredData : rawData);
  }, [rawData, filteredData, filters]);

  // Pre-calculated chart series
  const chartData = useMemo(() => {
    return prepareChartData(rawData);
  }, [rawData]);

  // Update specific filter property
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Reset filters to default 'All'
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Upload/Load a custom dataset dynamically
  const loadCustomDataset = (customData, datasetName = 'Custom Uploaded Dataset') => {
    setServiceActiveDataset(customData);
    setRawData(customData);
    setDatasetMeta({
      name: datasetName,
      isCustom: true,
      lastUpdated: new Date().toLocaleTimeString()
    });
    resetFilters();
  };

  // Reset to original default mock data
  const restoreDefaultDataset = () => {
    const data = resetToDefaultDataset();
    setRawData(data);
    setDatasetMeta({
      name: 'Plant Pathology AI Benchmark v2.4',
      isCustom: false,
      lastUpdated: new Date().toLocaleTimeString()
    });
    resetFilters();
  };

  // Add new diagnostic record from AI Simulator
  const addDiagnosticRecord = (record) => {
    setRawData((prev) => [record, ...prev]);
  };

  return (
    <DatasetContext.Provider
      value={{
        rawData,
        filteredData,
        filters,
        stats,
        chartData,
        isLoading,
        error,
        datasetMeta,
        updateFilter,
        resetFilters,
        loadCustomDataset,
        restoreDefaultDataset,
        addDiagnosticRecord,
        refetchDataset: fetchDataset
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};

export const useDataset = () => {
  const context = useContext(DatasetContext);
  if (!context) throw new Error('useDataset must be used within a DatasetProvider');
  return context;
};
