import {
  getSeasonFromTimestamp,
  isPlantNativeToRegion,
  getIdealHarvestingSeasons,
  areSeasonsCompatible,
  getRegionName,
  getCommonName
} from './geographicalData';

// Type definitions
export type PlantData = {
  common_name: string;
  scientific_name: string;
  confidence_score: number;
};

export type LocationData = {
  latitude: number | string;
  longitude: number | string;
  timestamp: string;
};

export type AIAnalysis = {
  health_score: number;
  quality_rating: number;
  diseases_detected: string[];
};

export type ScoreComponent = {
  score: number;
  reasoning: string;
};

export type CredibilityScore = {
  overall_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  breakdown: {
    geographical: ScoreComponent;
    seasonal: ScoreComponent;
    ai_analysis: ScoreComponent;
  };
  recommendations: string[];
  warning_flags: string[];
};

/**
 * Calculate geographical consistency score (40 points max)
 */
function calculateGeographicalScore(plantData: PlantData, locationData: LocationData): ScoreComponent {
  // Convert string coordinates to numbers if needed
  const lat = typeof locationData.latitude === 'string' ? parseFloat(locationData.latitude) : locationData.latitude;
  const lng = typeof locationData.longitude === 'string' ? parseFloat(locationData.longitude) : locationData.longitude;
  
  // Check if plant is native to the region
  const isNative = isPlantNativeToRegion(plantData.scientific_name, lat, lng);
  
  // Calculate base score
  let score = isNative ? 30 : 10;
  
  // Add additional points based on confidence
  score += Math.min(10, plantData.confidence_score / 10);
  
  // Cap at 40
  score = Math.min(40, score);
  
  // Generate reasoning
  const regionName = getRegionName(lat, lng);
  const commonName = plantData.common_name || getCommonName(plantData.scientific_name);
  
  let reasoning = isNative 
    ? `${commonName} (${plantData.scientific_name}) is native to ${regionName} and typically grows well at these coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)}).`
    : `${commonName} (${plantData.scientific_name}) is not typically found in ${regionName}, which raises concerns about authenticity.`;
  
  return {
    score,
    reasoning
  };
}

/**
 * Calculate seasonal appropriateness score (30 points max)
 */
function calculateSeasonalScore(plantData: PlantData, locationData: LocationData): ScoreComponent {
  // Get current season from timestamp
  const lat = typeof locationData.latitude === 'string' ? parseFloat(locationData.latitude) : locationData.latitude;
  const lng = typeof locationData.longitude === 'string' ? parseFloat(locationData.longitude) : locationData.longitude;
  const currentSeason = getSeasonFromTimestamp(locationData.timestamp, lat, lng);
  
  // Determine ideal harvesting seasons for this plant
  const idealHarvestingSeasons = getIdealHarvestingSeasons(plantData.scientific_name);
  
  // If we don't have data for this plant, give a neutral score
  if (idealHarvestingSeasons.length === 0) {
    return {
      score: 15,
      reasoning: `No seasonal data available for ${plantData.scientific_name}. Using neutral seasonal score.`
    };
  }
  
  // Check season compatibility
  const { isMatch, isAdjacent } = areSeasonsCompatible(currentSeason, idealHarvestingSeasons);
  
  // Calculate score based on season match
  let score = 0;
  if (isMatch) {
    score = 30; // Perfect match
  } else if (isAdjacent) {
    score = 15; // Adjacent season
  } else {
    score = 5; // Wrong season
  }
  
  // Generate reasoning
  const collectionDate = new Date(locationData.timestamp).toLocaleDateString();
  const commonName = plantData.common_name || getCommonName(plantData.scientific_name);
  
  let reasoning = '';
  if (score === 30) {
    reasoning = `The collection timestamp (${collectionDate}) falls within the ideal ${currentSeason} harvesting season for ${commonName}.`;
  } else if (score === 15) {
    reasoning = `The collection timestamp (${currentSeason}) is slightly outside the ideal harvesting period (${idealHarvestingSeasons.join(', ')}), but still within an acceptable range.`;
  } else {
    reasoning = `The collection timestamp (${currentSeason}) is significantly outside the recommended harvesting seasons (${idealHarvestingSeasons.join(', ')}) for this herb.`;
  }
  
  return {
    score,
    reasoning
  };
}

/**
 * Calculate AI analysis reliability score (30 points max)
 */
function calculateAIAnalysisScore(plantData: PlantData, aiAnalysis: AIAnalysis): ScoreComponent {
  let score = 0;
  
  // Score based on health assessment (0-10 points)
  score += Math.min(10, aiAnalysis.health_score);
  
  // Score based on quality rating (0-10 points)
  score += Math.min(10, aiAnalysis.quality_rating);
  
  // Penalty for diseases detected (0-10 points)
  const diseasesPenalty = Math.min(10, aiAnalysis.diseases_detected.length * 2);
  score += (10 - diseasesPenalty);
  
  // Generate reasoning
  const commonName = plantData.common_name || getCommonName(plantData.scientific_name);
  let reasoning = `AI analysis indicates a health score of ${aiAnalysis.health_score}/10 and quality rating of ${aiAnalysis.quality_rating}/10 for ${commonName}.`;
  
  if (aiAnalysis.diseases_detected.length > 0) {
    reasoning += ` Detected issues: ${aiAnalysis.diseases_detected.join(', ')}.`;
  } else {
    reasoning += ` No diseases or issues detected.`;
  }
  
  return {
    score,
    reasoning
  };
}

/**
 * Determine risk level based on overall score
 */
function getRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
  if (score >= 80) return 'LOW';
  if (score >= 60) return 'MEDIUM';
  if (score >= 40) return 'HIGH';
  return 'CRITICAL';
}

/**
 * Generate recommendations based on scores
 */
function generateRecommendations(scores: {
  geographical: ScoreComponent;
  seasonal: ScoreComponent;
  ai_analysis: ScoreComponent;
}): string[] {
  const recommendations: string[] = [];
  
  // Geographical recommendations
  if (scores.geographical.score < 20) {
    recommendations.push('Verify the collection location with additional documentation or photographs.');
    recommendations.push('Consider implementing GPS-locked collection records for future harvests.');
  }
  
  // Seasonal recommendations
  if (scores.seasonal.score < 15) {
    recommendations.push('Adjust harvesting schedule to align with optimal seasonal conditions.');
    recommendations.push('Implement seasonal harvesting guidelines for collectors.');
  }
  
  // AI analysis recommendations
  if (scores.ai_analysis.score < 20) {
    recommendations.push('Conduct additional quality testing through laboratory analysis.');
    recommendations.push('Implement improved storage and handling procedures to maintain herb quality.');
  }
  
  return recommendations;
}

/**
 * Generate warning flags based on scores
 */
function generateWarningFlags(scores: {
  geographical: ScoreComponent;
  seasonal: ScoreComponent;
  ai_analysis: ScoreComponent;
}): string[] {
  const flags: string[] = [];
  
  if (scores.geographical.score < 15) {
    flags.push('GEOGRAPHICAL MISMATCH: Collection location inconsistent with typical growing region');
  }
  
  if (scores.seasonal.score < 10) {
    flags.push('SEASONAL ANOMALY: Collection time significantly outside optimal harvesting period');
  }
  
  if (scores.ai_analysis.score < 15) {
    flags.push('QUALITY CONCERN: AI analysis indicates potential quality or health issues');
  }
  
  return flags;
}

/**
 * Main function to calculate credibility score
 */
export function calculateCredibilityScore(
  plantData: PlantData,
  locationData: LocationData,
  aiAnalysis: AIAnalysis
): CredibilityScore {
  // Calculate individual scores
  const geographical = calculateGeographicalScore(plantData, locationData);
  const seasonal = calculateSeasonalScore(plantData, locationData);
  const ai_analysis = calculateAIAnalysisScore(plantData, aiAnalysis);
  
  // Calculate overall score (sum of all components)
  const overall_score = geographical.score + seasonal.score + ai_analysis.score;
  
  // Determine risk level
  const risk_level = getRiskLevel(overall_score);
  
  // Generate recommendations and warning flags
  const recommendations = generateRecommendations({ geographical, seasonal, ai_analysis });
  const warning_flags = generateWarningFlags({ geographical, seasonal, ai_analysis });
  
  return {
    overall_score,
    risk_level,
    breakdown: {
      geographical,
      seasonal,
      ai_analysis
    },
    recommendations,
    warning_flags
  };
}