import { mockDataset } from '../data/mockData';
import { parseCSV, exportToCSV as downloadCSV, exportToJSON as downloadJSON } from '../utils/csvParser';

/**
 * Data Service Layer
 * Abstracts data loading, filtering, statistical calculations, and chart transformations.
 * 
 * TO SWAP WITH A REAL DATASET:
 * 1. Place your extracted dataset (e.g. dataset.json or dataset.csv) in public/ or src/data/
 * 2. Update the loadDataset() function below to fetch('/your-dataset.json') or import your file.
 * 3. The rest of the application will automatically reflect your dataset without UI changes!
 */

// In-memory runtime cache for custom uploaded or active datasets
let activeDatasetInstance = null;

/**
 * Loads the active dataset (resolves asynchronously to emulate real file/fetch loading)
 */
export const loadDataset = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (activeDatasetInstance) {
        resolve([...activeDatasetInstance]);
      } else {
        resolve([...mockDataset]);
      }
    }, 150); // slight micro-delay for realistic UI loading states
  });
};

/**
 * Allows runtime replacement of dataset (e.g., when user uploads CSV/JSON via UI)
 */
export const setActiveDataset = (newDataset) => {
  if (Array.isArray(newDataset)) {
    activeDatasetInstance = [...newDataset];
  }
};

/**
 * Resets back to the default bundled mock dataset
 */
export const resetToDefaultDataset = () => {
  activeDatasetInstance = null;
  return [...mockDataset];
};

/**
 * Multi-criteria dataset filtering
 */
export const filterDataset = (data, filters = {}) => {
  if (!Array.isArray(data)) return [];

  const {
    search = '',
    crop = 'All',
    disease = 'All',
    severity = 'All',
    status = 'All',
    split = 'All',
    minConfidence = 0
  } = filters;

  const query = (search || '').toLowerCase().trim();

  return data.filter((item) => {
    // 1. Text search across key fields
    if (query) {
      const matchSearch =
        (item.id && item.id.toLowerCase().includes(query)) ||
        (item.crop && item.crop.toLowerCase().includes(query)) ||
        (item.disease && item.disease.toLowerCase().includes(query)) ||
        (item.scientificName && item.scientificName.toLowerCase().includes(query)) ||
        (item.symptoms && item.symptoms.toLowerCase().includes(query)) ||
        (item.location && item.location.toLowerCase().includes(query));
      if (!matchSearch) return false;
    }

    // 2. Crop filter
    if (crop !== 'All' && item.crop !== crop) return false;

    // 3. Disease filter
    if (disease !== 'All' && item.disease !== disease) return false;

    // 4. Severity filter
    if (severity !== 'All' && (item.severity || '').toLowerCase() !== severity.toLowerCase()) return false;

    // 5. Status filter (Healthy / Infected)
    if (status !== 'All' && (item.status || '').toLowerCase() !== status.toLowerCase()) return false;

    // 6. Split filter (Train / Validation / Test)
    if (split !== 'All' && (item.split || '').toLowerCase() !== split.toLowerCase()) return false;

    // 7. Minimum Confidence
    if (minConfidence > 0) {
      const conf = item.confidence > 1 ? item.confidence / 100 : item.confidence;
      if (conf < minConfidence) return false;
    }

    return true;
  });
};

/**
 * Dedicated text search helper
 */
export const searchDataset = (data, query) => {
  return filterDataset(data, { search: query });
};

/**
 * Computes high-level KPI metrics & statistics for the dataset
 */
export const calculateStatistics = (data) => {
  const total = Array.isArray(data) ? data.length : 0;
  if (total === 0) {
    return {
      totalRecords: 0,
      healthyCount: 0,
      infectedCount: 0,
      healthyPercent: 0,
      infectedPercent: 0,
      avgConfidence: 0,
      severeCriticalCount: 0,
      uniqueCropsCount: 0,
      uniqueDiseasesCount: 0,
      mostPrevalentDisease: 'None',
      highestRiskCrop: 'None'
    };
  }

  let healthyCount = 0;
  let infectedCount = 0;
  let totalConfidence = 0;
  let severeCriticalCount = 0;

  const cropCounts = {};
  const cropInfections = {};
  const diseaseCounts = {};

  data.forEach((row) => {
    const isHealthy = (row.status || '').toLowerCase() === 'healthy' || (row.disease || '').toLowerCase().includes('healthy');
    if (isHealthy) {
      healthyCount++;
    } else {
      infectedCount++;
      // Count diseases
      const dis = row.disease || 'Unknown Disease';
      diseaseCounts[dis] = (diseaseCounts[dis] || 0) + 1;

      // Crop infections
      if (row.crop) {
        cropInfections[row.crop] = (cropInfections[row.crop] || 0) + 1;
      }
    }

    if (row.crop) {
      cropCounts[row.crop] = (cropCounts[row.crop] || 0) + 1;
    }

    // Confidence
    const conf = row.confidence !== undefined ? (row.confidence > 1 ? row.confidence / 100 : row.confidence) : 0.92;
    totalConfidence += conf;

    // Severe or Critical
    const sev = (row.severity || '').toLowerCase();
    if (sev === 'severe' || sev === 'critical' || sev === 'high') {
      severeCriticalCount++;
    }
  });

  // Find most prevalent disease
  let mostPrevalentDisease = 'None';
  let maxDisCount = 0;
  Object.entries(diseaseCounts).forEach(([dis, count]) => {
    if (count > maxDisCount) {
      maxDisCount = count;
      mostPrevalentDisease = dis;
    }
  });

  // Find highest risk crop (highest infection rate)
  let highestRiskCrop = 'None';
  let maxInfRate = -1;
  Object.entries(cropCounts).forEach(([crop, count]) => {
    const inf = cropInfections[crop] || 0;
    const rate = inf / count;
    if (rate > maxInfRate) {
      maxInfRate = rate;
      highestRiskCrop = crop;
    }
  });

  return {
    totalRecords: total,
    healthyCount,
    infectedCount,
    healthyPercent: (healthyCount / total) * 100,
    infectedPercent: (infectedCount / total) * 100,
    avgConfidence: (totalConfidence / total) * 100,
    severeCriticalCount,
    uniqueCropsCount: Object.keys(cropCounts).length,
    uniqueDiseasesCount: Object.keys(diseaseCounts).length,
    mostPrevalentDisease,
    highestRiskCrop
  };
};

/**
 * Transforms raw dataset into optimized series for Recharts visualizations
 */
export const prepareChartData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      cropHealthData: [],
      diseasePrevalenceData: [],
      severityData: [],
      confidenceBinsData: [],
      splitDistributionData: [],
      timelineTrendData: [],
      cropRiskRanking: []
    };
  }

  // 1. Crop Health Data (Healthy vs Infected stacked)
  const cropMap = {};
  data.forEach((row) => {
    const crop = row.crop || 'Unknown';
    if (!cropMap[crop]) {
      cropMap[crop] = { name: crop, healthy: 0, infected: 0, total: 0 };
    }
    const isHealthy = (row.status || '').toLowerCase() === 'healthy' || (row.disease || '').toLowerCase().includes('healthy');
    if (isHealthy) {
      cropMap[crop].healthy++;
    } else {
      cropMap[crop].infected++;
    }
    cropMap[crop].total++;
  });
  const cropHealthData = Object.values(cropMap).sort((a, b) => b.total - a.total);

  // 2. Disease Prevalence (Top 8 diseases excluding healthy)
  const diseaseMap = {};
  data.forEach((row) => {
    const dis = row.disease || 'Unknown';
    if (!dis.toLowerCase().includes('healthy')) {
      diseaseMap[dis] = (diseaseMap[dis] || 0) + 1;
    }
  });
  const diseasePrevalenceData = Object.entries(diseaseMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // 3. Severity Distribution (for Donut Chart)
  const sevMap = { None: 0, Low: 0, Moderate: 0, High: 0, Critical: 0 };
  data.forEach((row) => {
    let s = row.severity ? row.severity.charAt(0).toUpperCase() + row.severity.slice(1).toLowerCase() : 'Moderate';
    if (s === 'Severe') s = 'Critical';
    if (sevMap[s] !== undefined) {
      sevMap[s]++;
    } else {
      sevMap['Moderate']++;
    }
  });

  const severityColors = {
    None: '#10b981',     // emerald
    Low: '#3b82f6',      // blue
    Moderate: '#f59e0b', // amber
    High: '#f97316',     // orange
    Critical: '#ef4444'  // red
  };

  const severityData = Object.entries(sevMap)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
      color: severityColors[name] || '#94a3b8'
    }));

  // 4. Model Confidence Distribution Bins
  const bins = {
    '80 - 85%': 0,
    '86 - 90%': 0,
    '91 - 94%': 0,
    '95 - 97%': 0,
    '98 - 100%': 0
  };

  data.forEach((row) => {
    const conf = (row.confidence !== undefined ? (row.confidence > 1 ? row.confidence : row.confidence * 100) : 92);
    if (conf < 86) bins['80 - 85%']++;
    else if (conf < 91) bins['86 - 90%']++;
    else if (conf < 95) bins['91 - 94%']++;
    else if (conf < 98) bins['95 - 97%']++;
    else bins['98 - 100%']++;
  });

  const confidenceBinsData = Object.entries(bins).map(([bin, count]) => ({ bin, count }));

  // 5. ML Split Distribution (Train / Val / Test)
  const splitMap = { Train: 0, Validation: 0, Test: 0 };
  data.forEach((row) => {
    const s = row.split || 'Train';
    if (splitMap[s] !== undefined) splitMap[s]++;
    else splitMap.Train++;
  });
  const splitDistributionData = Object.entries(splitMap).map(([name, value]) => ({
    name,
    value,
    color: name === 'Train' ? '#6366f1' : name === 'Validation' ? '#a855f7' : '#06b6d4'
  }));

  // 6. Timeline Trend (Sample diagnoses chronologically grouped by month/date)
  const dateMap = {};
  data.forEach((row) => {
    if (row.date) {
      // Group by YYYY-MM
      const key = row.date.substring(0, 7);
      if (!dateMap[key]) {
        dateMap[key] = { date: key, total: 0, infected: 0, healthy: 0 };
      }
      dateMap[key].total++;
      if ((row.status || '').toLowerCase() === 'healthy') {
        dateMap[key].healthy++;
      } else {
        dateMap[key].infected++;
      }
    }
  });
  const timelineTrendData = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));

  // 7. Crop Risk Ranking
  const cropRiskRanking = Object.values(cropMap).map((item) => {
    const infectionRate = (item.infected / item.total) * 100;
    let riskLevel = 'Low';
    if (infectionRate >= 75) riskLevel = 'Critical';
    else if (infectionRate >= 50) riskLevel = 'High';
    else if (infectionRate >= 25) riskLevel = 'Moderate';

    return {
      crop: item.name,
      total: item.total,
      infected: item.infected,
      healthy: item.healthy,
      infectionRate: infectionRate.toFixed(1),
      riskLevel
    };
  }).sort((a, b) => parseFloat(b.infectionRate) - parseFloat(a.infectionRate));

  return {
    cropHealthData,
    diseasePrevalenceData,
    severityData,
    confidenceBinsData,
    splitDistributionData,
    timelineTrendData,
    cropRiskRanking
  };
};

/**
 * Parses user-provided CSV or JSON text and formats it into normalized records
 */
export const parseCustomDataset = (text, type = 'json') => {
  try {
    let raw = [];
    if (type === 'json') {
      raw = JSON.parse(text);
      if (!Array.isArray(raw)) {
        throw new Error('JSON dataset must be an array of objects.');
      }
    } else {
      raw = parseCSV(text);
    }

    if (raw.length === 0) {
      throw new Error('Dataset contains no records.');
    }

    // Normalize records to ensure baseline fields exist
    const normalized = raw.map((row, idx) => {
      const crop = row.crop || row.Crop || row.plant || row.species || 'Unknown Crop';
      const disease = row.disease || row.Disease || row.condition || row.label || 'Unknown Condition';
      const isHealthy = disease.toLowerCase().includes('healthy') || ('' + (row.status || '')).toLowerCase() === 'healthy';

      return {
        id: row.id || row.ID || `REC-${1000 + idx}`,
        crop: crop,
        disease: disease,
        scientificName: row.scientificName || row.scientific_name || 'N/A',
        status: isHealthy ? 'Healthy' : 'Infected',
        severity: isHealthy ? 'None' : (row.severity || row.Severity || 'Moderate'),
        confidence: row.confidence !== undefined ? parseFloat(row.confidence) : 0.94,
        split: row.split || row.Split || 'Test',
        date: row.date || row.Date || new Date().toISOString().split('T')[0],
        location: row.location || row.Location || row.region || 'Custom Upload Field',
        symptoms: row.symptoms || row.Symptoms || 'User provided dataset record',
        treatment: row.treatment || row.Treatment || (isHealthy ? 'Routine maintenance' : 'Consult agronomist'),
        datasetSource: 'User Uploaded Dataset'
      };
    });

    return { success: true, data: normalized, count: normalized.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export const exportToCSV = downloadCSV;
export const exportToJSON = downloadJSON;

export { downloadCSV, downloadJSON };
