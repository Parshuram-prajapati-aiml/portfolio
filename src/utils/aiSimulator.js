import { sampleLeaves } from '../data/sampleImages';
import { diseaseDatabase } from './../data/cropData';

/**
 * Simulates a convolutional neural network (CNN) forward pass on a crop leaf image
 * @param {string} cropId - The selected crop category ('tomato', 'potato', etc.)
 * @param {string|null} sampleId - The ID of the sample leaf, if using one from the gallery
 * @param {File|string|null} customImage - The custom file or webcam base64, if uploaded
 * @returns {Promise<Object>} The diagnostic result
 */
export const simulateAIDiagnosis = (cropId, sampleId, customImage) => {
  return new Promise((resolve) => {
    // Artificial 2.5-second processing delay to let the scanner animation play
    setTimeout(() => {
      let diseaseKey = '';
      let confidence = 0;

      if (sampleId) {
        // Look up predefined sample leaf
        const leaf = sampleLeaves.find(l => l.id === sampleId);
        if (leaf) {
          diseaseKey = leaf.diseaseKey;
          // Generate high confidence for curated samples
          confidence = parseFloat((92.5 + Math.random() * 6.3).toFixed(1));
        }
      }

      // If no sample leaf, simulate heuristic analysis on uploaded/webcam crop
      if (!diseaseKey) {
        confidence = parseFloat((87.4 + Math.random() * 11.2).toFixed(1));
        
        // Define default mapping for each crop when custom uploaded
        const possibleDiseases = {
          tomato: ['tomato_early_blight', 'tomato_late_blight', 'tomato_mosaic_virus', 'tomato_healthy'],
          potato: ['potato_early_blight', 'potato_late_blight', 'potato_healthy'],
          rice: ['rice_leaf_blast', 'rice_brown_spot', 'rice_healthy'],
          wheat: ['wheat_yellow_rust', 'wheat_leaf_rust', 'wheat_healthy'],
          corn: ['corn_common_rust', 'corn_gray_leaf_spot', 'corn_healthy']
        };

        const list = possibleDiseases[cropId] || ['tomato_healthy'];
        
        // Heuristic based on string hashing of image name or size (to keep it deterministic for same file)
        let hash = 0;
        if (customImage && typeof customImage === 'string') {
          // If base64
          hash = customImage.slice(-50).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        } else if (customImage && customImage.name) {
          // If File object
          hash = customImage.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + customImage.size;
        } else {
          hash = Math.floor(Math.random() * 100);
        }

        const index = hash % list.length;
        diseaseKey = list[index];
      }

      // Retrieve full details from pathology database
      const details = diseaseDatabase[diseaseKey];

      const diagnosisResult = {
        id: 'scan_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        timestamp: new Date().toISOString(),
        cropId,
        diseaseKey,
        confidence,
        name: details.name,
        type: details.type,
        symptoms: details.symptoms,
        causes: details.causes,
        organicRemedies: details.organicRemedies,
        chemicalRemedies: details.chemicalRemedies,
        // Carry over SVG shape if it exists
        svgType: sampleId ? sampleLeaves.find(l => l.id === sampleId).svgType : 'custom_uploaded',
        customImageBlob: customImage ? (typeof customImage === 'string' ? customImage : URL.createObjectURL(customImage)) : null
      };

      // Auto-save to LocalStorage History
      saveScanToHistory(diagnosisResult);

      resolve(diagnosisResult);
    }, 2500);
  });
};

/**
 * Saves a completed scan diagnosis to browser localStorage
 * @param {Object} scanResult 
 */
export const saveScanToHistory = (scanResult) => {
  try {
    const history = getScanHistory();
    // Prepend to show newest first
    history.unshift(scanResult);
    localStorage.setItem('cropguard_history', JSON.stringify(history));
    
    // Dispatch custom event to notify listeners
    window.dispatchEvent(new Event('cropguard_history_updated'));
  } catch (error) {
    console.error('Failed to write to scan history:', error);
  }
};

/**
 * Fetches all previous scans from localStorage
 * @returns {Array} List of scans
 */
export const getScanHistory = () => {
  try {
    const historyData = localStorage.getItem('cropguard_history');
    return historyData ? JSON.parse(historyData) : [];
  } catch (e) {
    return [];
  }
};

/**
 * Deletes a scan by its ID from history
 * @param {string} scanId 
 */
export const deleteScanFromHistory = (scanId) => {
  try {
    const history = getScanHistory();
    const filtered = history.filter(s => s.id !== scanId);
    localStorage.setItem('cropguard_history', JSON.stringify(filtered));
    window.dispatchEvent(new Event('cropguard_history_updated'));
  } catch (e) {
    console.error(e);
  }
};
