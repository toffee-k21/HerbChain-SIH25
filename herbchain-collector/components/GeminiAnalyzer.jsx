"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// Credibility Score Component
function CredibilityScoreSection({ credibilityScore }) {
  if (!credibilityScore) return null;
  
  console.log('CredibilityScoreSection received:', credibilityScore);
  
  return (
    <div style={{
      backgroundColor: '#1e3a8a',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #3b82f6',
      marginTop: '15px'
    }}>
      <h4 style={{ color: '#93c5fd', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
        🔐 Credibility Score
      </h4>
      <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#d1d5db' }}>
        {/* Score display with fallback to overall_score if score is not available */}
        {(typeof credibilityScore.score === 'number' || typeof credibilityScore.overall_score === 'number') && (
          <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Score:</strong>
            <span style={{ 
              backgroundColor: 
                (credibilityScore.score >= 7 || credibilityScore.overall_score >= 70) ? '#14532d' : 
                (credibilityScore.score >= 4 || credibilityScore.overall_score >= 40) ? '#713f12' : 
                '#7f1d1d',
              color: '#d1d5db',
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '12px',
              fontWeight: 'bold',
              marginLeft: '6px'
            }}>
              {typeof credibilityScore.score === 'number' ? 
                `${credibilityScore.score}/10` : 
                `${Math.round(credibilityScore.overall_score / 10)}/10`}
            </span>
          </p>
        )}
        {/* Risk level display */}
        {credibilityScore.risk_level && (
          <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Risk Level:</strong> 
            <span style={{ 
              backgroundColor: 
                (credibilityScore.risk_level.toLowerCase ? credibilityScore.risk_level.toLowerCase() : String(credibilityScore.risk_level).toLowerCase()) === 'low' ? '#14532d' : 
                (credibilityScore.risk_level.toLowerCase ? credibilityScore.risk_level.toLowerCase() : String(credibilityScore.risk_level).toLowerCase()) === 'medium' ? '#713f12' : 
                '#7f1d1d',
              color: '#d1d5db',
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '12px',
              marginLeft: '6px'
            }}>
              {credibilityScore.risk_level}
            </span>
          </p>
        )}
        {/* Display warnings or warning_flags */}
        {((credibilityScore.warnings && credibilityScore.warnings.length > 0) || 
          (credibilityScore.warning_flags && credibilityScore.warning_flags.length > 0)) && (
          <div style={{ marginTop: '8px', color: '#d1d5db' }}>
            <strong>Warnings:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#d1d5db' }}>
              {credibilityScore.warnings && credibilityScore.warnings.map((warning, index) => (
                <li key={`warning-${index}`} style={{ margin: '2px 0', color: '#d1d5db' }}>{warning}</li>
              ))}
              {credibilityScore.warning_flags && credibilityScore.warning_flags.map((warning, index) => (
                <li key={`flag-${index}`} style={{ margin: '2px 0', color: '#d1d5db' }}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Display recommendations if available */}
        {credibilityScore.recommendations && credibilityScore.recommendations.length > 0 && (
          <div style={{ marginTop: '8px', color: '#d1d5db' }}>
            <strong>Recommendations:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#d1d5db' }}>
              {credibilityScore.recommendations.map((rec, index) => (
                <li key={index} style={{ margin: '2px 0', color: '#d1d5db' }}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Concise Results View Component
function ConciseResultsView({ analysis }) {
  if (!analysis) return null;
  
  console.log('ConciseResultsView received analysis:', analysis);
  console.log('Credibility score in ConciseResultsView:', analysis.credibility_score);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* Plant Identification */}
      <div style={{
        backgroundColor: '#172554',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #1e40af'
      }}>
        <h4 style={{ color: '#bfdbfe', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          🌱 Plant Identification
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#d1d5db' }}>
          <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Name:</strong> {analysis.plant.name}</p>
          <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Scientific:</strong> {analysis.plant.scientific}</p>
          <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Confidence:</strong> 
            <span style={{ 
              backgroundColor: analysis.plant.confidence === 'High' ? '#14532d' : analysis.plant.confidence === 'Medium' ? '#713f12' : '#7f1d1d',
              color: '#d1d5db',
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '12px',
              marginLeft: '6px'
            }}>
              {analysis.plant.confidence}
            </span>
          </p>
        </div>
      </div>

      {/* Health & Quality Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
        
        {/* Health Status */}
        <div style={{
          backgroundColor: '#052e16',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #15803d'
        }}>
          <h4 style={{ color: '#4ade80', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            💚 Health Status
          </h4>
          <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#d1d5db' }}>
            <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Status:</strong> {analysis.health.status}</p>
            <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Score:</strong>
              <span style={{ 
                backgroundColor: parseInt(analysis.health.score) >= 7 ? '#14532d' : parseInt(analysis.health.score) >= 4 ? '#713f12' : '#7f1d1d',
                color: '#d1d5db',
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '6px'
              }}>
                {analysis.health.score}
              </span>
            </p>
            <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Issues:</strong> {analysis.health.issues}</p>
          </div>
        </div>

        {/* Quality Assessment */}
        <div style={{
          backgroundColor: '#422006',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #b45309'
        }}>
          <h4 style={{ color: '#f59e0b', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            ⭐ Quality Rating
          </h4>
          <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#d1d5db' }}>
            <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Rating:</strong>
              <span style={{ 
                backgroundColor: parseInt(analysis.quality.rating) >= 7 ? '#14532d' : parseInt(analysis.quality.rating) >= 4 ? '#713f12' : '#7f1d1d',
                color: '#d1d5db',
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '6px'
              }}>
                {analysis.quality.rating}
              </span>
            </p>
            <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Market Ready:</strong> {analysis.quality.market_ready}</p>
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#d1d5db' }}>{analysis.quality.summary}</p>
          </div>
        </div>
      </div>

      {/* Disease & Pest Information */}
      <div style={{
        backgroundColor: '#4c1d95',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #7c3aed'
      }}>
        <h4 style={{ color: '#d8b4fe', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          🦠 Disease & Pest Analysis
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px', color: '#d1d5db' }}>
          <div style={{ color: '#d1d5db' }}>
            <strong>Diseases:</strong> {Array.isArray(analysis.diseases.found) ? analysis.diseases.found.join(', ') : analysis.diseases.found}
          </div>
          <div style={{ color: '#d1d5db' }}>
            <strong>Pests:</strong> {Array.isArray(analysis.diseases.pests) ? analysis.diseases.pests.join(', ') : analysis.diseases.pests}
          </div>
          <div style={{ color: '#d1d5db' }}>
            <strong>Severity:</strong>
            <span style={{ 
              backgroundColor: analysis.diseases.severity === 'None' ? '#14532d' : analysis.diseases.severity === 'Mild' ? '#713f12' : '#7f1d1d',
              color: '#d1d5db',
              padding: '2px 6px', 
              borderRadius: '4px', 
              fontSize: '12px',
              marginLeft: '6px'
            }}>
              {analysis.diseases.severity}
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{
        backgroundColor: '#083344',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #0ea5e9'
      }}>
        <h4 style={{ color: '#7dd3fc', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          📝 Recommendations
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.4', color: '#d1d5db' }}>
          <div style={{ marginBottom: '8px', color: '#d1d5db' }}>
            <strong>Immediate Actions:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#d1d5db' }}>
              {Array.isArray(analysis.recommendations.immediate) ? 
                analysis.recommendations.immediate.map((action, index) => (
                  <li key={index} style={{ margin: '2px 0', color: '#d1d5db' }}>{action}</li>
                )) : 
                <li style={{ color: '#d1d5db' }}>{analysis.recommendations.immediate}</li>
              }
            </ul>
          </div>
          <div style={{ marginBottom: '8px', color: '#d1d5db' }}>
            <strong>Care Tips:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#d1d5db' }}>
              {Array.isArray(analysis.recommendations.care) ? 
                analysis.recommendations.care.map((tip, index) => (
                  <li key={index} style={{ margin: '2px 0', color: '#d1d5db' }}>{tip}</li>
                )) : 
                <li style={{ color: '#d1d5db' }}>{analysis.recommendations.care}</li>
              }
            </ul>
          </div>
          <p style={{ margin: '4px 0', color: '#d1d5db' }}><strong>Harvest Timing:</strong> {analysis.recommendations.harvest}</p>
        </div>
      </div>

      {/* Ayurvedic Notes */}
      {analysis.ayurvedic_notes && analysis.ayurvedic_notes !== 'No additional notes available' && (
        <div style={{
          backgroundColor: '#422006',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #d97706'
        }}>
          <h4 style={{ color: '#f59e0b', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            🌿 Ayurvedic Notes
          </h4>
          <p style={{ fontSize: '14px', margin: '0', lineHeight: '1.4', color: '#d1d5db' }}>{analysis.ayurvedic_notes}</p>
        </div>
      )}
      
      {/* Credibility Score */}
      <CredibilityScoreSection credibilityScore={analysis.credibility_score} />
    </div>
  );
}

export default function GeminiAnalyzer({file, setFile, details, setDetails}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [detailedResults, setDetailedResults] = useState(null);
  const [error, setError] = useState(null);
  const [showConciseView, setShowConciseView] = useState(true);

  // Transform detailed Gemini response to concise format
  const transformToConciseFormat = (detailedResponse) => {
    try {
      if (!detailedResponse || !detailedResponse.analysis) {
        return null;
      }

      const { analysis } = detailedResponse;

      // Format credibility score with robust defensive checks
      let formattedCredibilityScore = null;
      if (detailedResponse.credibility_score) {
        console.log('Processing credibility score:', detailedResponse.credibility_score);
        
        // Get overall_score with fallback
        const overallScore = typeof detailedResponse.credibility_score.overall_score === 'number' 
          ? detailedResponse.credibility_score.overall_score 
          : 0;
          
        // Format risk level with proper capitalization
        const riskLevel = detailedResponse.credibility_score.risk_level 
          ? (detailedResponse.credibility_score.risk_level.charAt(0) + 
             detailedResponse.credibility_score.risk_level.slice(1).toLowerCase()) 
          : 'Unknown';
          
        // Get warnings with fallback
        const warnings = Array.isArray(detailedResponse.credibility_score.warning_flags) 
          ? detailedResponse.credibility_score.warning_flags 
          : [];
        
        // Get recommendations with fallback
        const recommendations = Array.isArray(detailedResponse.credibility_score.recommendations) 
          ? detailedResponse.credibility_score.recommendations 
          : [];
        
        formattedCredibilityScore = {
          score: Math.round(overallScore / 10), // Convert from 0-100 to 0-10 scale
          overall_score: overallScore, // Keep original score for reference
          risk_level: riskLevel,
          warnings: warnings,
          warning_flags: warnings, // Add warning_flags for compatibility
          recommendations: recommendations
        };
        
        console.log('Formatted credibility score:', formattedCredibilityScore);
      }

      // Format plant identification
      const plantIdentification = analysis.plant_identification || {};
      const formattedPlant = {
        name: plantIdentification.common_name || 'Unknown',
        scientific: plantIdentification.scientific_name || 'Unknown',
        confidence: plantIdentification.confidence || 'Low'
      };

      // Format health status
      const healthStatus = analysis.health_status || {};
      const formattedHealth = {
        status: healthStatus.overall_health || 'Unknown',
        score: healthStatus.health_score || '0',
        issues: Array.isArray(healthStatus.visible_symptoms) ? 
                healthStatus.visible_symptoms.join(', ') : 
                (healthStatus.visible_symptoms || 'None detected')
      };

      // Format quality assessment
      const qualityAssessment = analysis.quality_assessment || {};
      const formattedQuality = {
        rating: qualityAssessment.quality_rating || '0',
        market_ready: qualityAssessment.harvest_readiness || 'No',
        summary: qualityAssessment.marketability || 'No information available'
      };

      // Format disease detection
      const diseaseDetection = analysis.disease_detection || {};
      const formattedDiseases = {
        found: diseaseDetection.diseases_found || 'None detected',
        severity: diseaseDetection.severity || 'None',
        pests: diseaseDetection.pest_issues || 'None detected'
      };

      // Format recommendations
      const recommendations = analysis.recommendations || {};
      const formattedRecommendations = {
        immediate: recommendations.immediate_actions || 'No immediate actions needed',
        care: recommendations.care_tips || 'No specific care tips available',
        harvest: recommendations.harvest_timing || 'Not specified'
      };

      // Create the final result object
      const result = {
        plant: formattedPlant,
        health: formattedHealth,
        quality: formattedQuality,
        diseases: formattedDiseases,
        recommendations: formattedRecommendations,
        ayurvedic_notes: analysis.ayurvedic_notes || 'No additional notes available',
        credibility_score: formattedCredibilityScore
      };

      return result;
    } catch (error) {
      console.error('Error transforming response:', error);
      return null;
    }
  };

  // Handle image analysis
  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      setAnalysisResults(null);
      setDetailedResults(null);

      // Create form data with image and timestamp
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('timestamp', new Date().toISOString());

      // Get geolocation if available
      let locationData = { latitude: 28.6139, longitude: 77.2090 }; // Default to Delhi
      
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });
        
        locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        console.log('Got location:', locationData);
      } catch (geoError) {
        console.warn('Geolocation error:', geoError);
        console.log('Using default location:', locationData);
      }
      
      // Add location data to form
      formData.append('latitude', locationData.latitude);
      formData.append('longitude', locationData.longitude);

      // Send request to API
      const response = await fetch('/api/analyze-plant', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Transform data to concise format
      const conciseData = transformToConciseFormat(data);
      console.log('Transformed data:', conciseData);
      
      // Update states
      setDetailedResults(data);
      setAnalysisResults(conciseData);
      setDetails(data); // Update parent state if needed
    } catch (error) {
      console.error('Analysis error:', error);
      setError(`Analysis failed: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFile(file); // Update parent state if needed
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">Plant Analysis</h2>
        
        {/* File input section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Plant Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
              <span>Select Image</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
            <button
              onClick={analyzeImage}
              disabled={!selectedImage || isAnalyzing}
              className={`py-2 px-4 rounded-md transition duration-200 ${!selectedImage || isAnalyzing ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Plant'}
            </button>
          </div>
        </div>
        
        {/* Image preview */}
        {imagePreview && (
          <div className="mt-4 flex justify-center">
            <div className="relative w-64 h-64 border-2 border-gray-600 rounded-lg overflow-hidden">
              <Image 
                src={imagePreview} 
                alt="Selected plant" 
                fill
                style={{ objectFit: 'cover' }} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Analysis results */}
      {analysisResults && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-300">Analysis Results</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setShowConciseView(true)}
                className={`px-3 py-1 text-sm rounded-md ${showConciseView ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Summary View
              </button>
              <button 
                onClick={() => setShowConciseView(false)}
                className={`px-3 py-1 text-sm rounded-md ${!showConciseView ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                JSON View
              </button>
            </div>
          </div>

          {showConciseView ? (
            <ConciseResultsView analysis={analysisResults} />
          ) : (
            <div className="bg-gray-900 p-4 rounded-lg overflow-auto max-h-[600px]">
              <pre className="text-gray-300 text-sm">
                {JSON.stringify(detailedResults, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}