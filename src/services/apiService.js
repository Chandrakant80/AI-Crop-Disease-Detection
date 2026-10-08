/**
 * API Service for connecting React components to the Flask Python backend.
 */

const API_BASE_URL = 'http://127.0.0.1:5000';

/**
 * Checks if the Flask backend server is alive and running.
 */
export const checkBackendHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (response.ok) {
      const data = await response.json();
      return { online: true, ...data };
    }
    return { online: false };
  } catch (error) {
    return { online: false, error: error.message };
  }
};

/**
 * Sends a leaf image file to the Flask backend /predict endpoint.
 */
export const predictLeafImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({ error: 'Prediction failed' }));
    throw new Error(errData.error || `Server responded with status ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};

/**
 * Fetches recent scan records from the backend database.
 */
export const fetchRecentDiagnoses = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/history?limit=${limit}`);
    if (response.ok) {
      const data = await response.json();
      return data.history || [];
    }
    return [];
  } catch (err) {
    console.warn('Failed to fetch backend history:', err);
    return [];
  }
};
