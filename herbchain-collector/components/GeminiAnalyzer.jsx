"use client";
import React, { useState } from 'react';
import Image from 'next/image';

// Concise Results View Component
function ConciseResultsView({ analysis }) {
  if (!analysis) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* Plant Identification */}
      <div style={{
        backgroundColor: '#eff6ff',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #dbeafe'
      }}>
        <h4 style={{ color: '#1e40af', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          🌱 Plant Identification
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#000000' }}>
          <p style={{ margin: '4px 0', color: '#000000' }}><strong>Name:</strong> {analysis.plant.name}</p>
          <p style={{ margin: '4px 0', color: '#000000' }}><strong>Scientific:</strong> {analysis.plant.scientific}</p>
          <p style={{ margin: '4px 0', color: '#000000' }}><strong>Confidence:</strong> 
            <span style={{ 
              backgroundColor: analysis.plant.confidence === 'High' ? '#dcfce7' : analysis.plant.confidence === 'Medium' ? '#fef3c7' : '#fee2e2',
              color: analysis.plant.confidence === 'High' ? '#166534' : analysis.plant.confidence === 'Medium' ? '#92400e' : '#dc2626',
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
          backgroundColor: '#f0fdf4',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #bbf7d0'
        }}>
          <h4 style={{ color: '#166534', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            💚 Health Status
          </h4>
          <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#000000' }}>
            <p style={{ margin: '4px 0', color: '#000000' }}><strong>Status:</strong> {analysis.health.status}</p>
            <p style={{ margin: '4px 0', color: '#000000' }}><strong>Score:</strong>
              <span style={{ 
                backgroundColor: parseInt(analysis.health.score) >= 7 ? '#dcfce7' : parseInt(analysis.health.score) >= 4 ? '#fef3c7' : '#fee2e2',
                color: parseInt(analysis.health.score) >= 7 ? '#166534' : parseInt(analysis.health.score) >= 4 ? '#92400e' : '#dc2626',
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '6px'
              }}>
                {analysis.health.score}
              </span>
            </p>
            <p style={{ margin: '4px 0', color: '#000000' }}><strong>Issues:</strong> {analysis.health.issues}</p>
          </div>
        </div>

        {/* Quality Assessment */}
        <div style={{
          backgroundColor: '#fef3c7',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #fed7aa'
        }}>
          <h4 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            ⭐ Quality Rating
          </h4>
          <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#000000' }}>
            <p style={{ margin: '4px 0', color: '#000000' }}><strong>Rating:</strong>
              <span style={{ 
                backgroundColor: parseInt(analysis.quality.rating) >= 7 ? '#dcfce7' : parseInt(analysis.quality.rating) >= 4 ? '#fef3c7' : '#fee2e2',
                color: parseInt(analysis.quality.rating) >= 7 ? '#166534' : parseInt(analysis.quality.rating) >= 4 ? '#92400e' : '#dc2626',
                padding: '2px 6px', 
                borderRadius: '4px', 
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '6px'
              }}>
                {analysis.quality.rating}
              </span>
            </p>
            <p style={{ margin: '4px 0', color: '#000000' }}><strong>Market Ready:</strong> {analysis.quality.market_ready}</p>
            <p style={{ margin: '4px 0', fontSize: '12px', color: '#000000' }}>{analysis.quality.summary}</p>
          </div>
        </div>
      </div>

      {/* Disease & Pest Information */}
      <div style={{
        backgroundColor: '#fdf2f8',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #fce7f3'
      }}>
        <h4 style={{ color: '#be185d', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          🦠 Disease & Pest Analysis
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px', color: '#000000' }}>
          <div style={{ color: '#000000' }}>
            <strong>Diseases:</strong> {Array.isArray(analysis.diseases.found) ? analysis.diseases.found.join(', ') : analysis.diseases.found}
          </div>
          <div style={{ color: '#000000' }}>
            <strong>Pests:</strong> {Array.isArray(analysis.diseases.pests) ? analysis.diseases.pests.join(', ') : analysis.diseases.pests}
          </div>
          <div style={{ color: '#000000' }}>
            <strong>Severity:</strong>
            <span style={{ 
              backgroundColor: analysis.diseases.severity === 'None' ? '#dcfce7' : analysis.diseases.severity === 'Mild' ? '#fef3c7' : '#fee2e2',
              color: analysis.diseases.severity === 'None' ? '#166534' : analysis.diseases.severity === 'Mild' ? '#92400e' : '#dc2626',
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
        backgroundColor: '#f0f9ff',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #bae6fd'
      }}>
        <h4 style={{ color: '#0369a1', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
          📝 Recommendations
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.4', color: '#000000' }}>
          <div style={{ marginBottom: '8px', color: '#000000' }}>
            <strong>Immediate Actions:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#000000' }}>
              {Array.isArray(analysis.recommendations.immediate) ? 
                analysis.recommendations.immediate.map((action, index) => (
                  <li key={index} style={{ margin: '2px 0', color: '#000000' }}>{action}</li>
                )) : 
                <li style={{ color: '#000000' }}>{analysis.recommendations.immediate}</li>
              }
            </ul>
          </div>
          <div style={{ marginBottom: '8px', color: '#000000' }}>
            <strong>Care Tips:</strong>
            <ul style={{ margin: '4px 0', paddingLeft: '20px', color: '#000000' }}>
              {Array.isArray(analysis.recommendations.care) ? 
                analysis.recommendations.care.map((tip, index) => (
                  <li key={index} style={{ margin: '2px 0', color: '#000000' }}>{tip}</li>
                )) : 
                <li style={{ color: '#000000' }}>{analysis.recommendations.care}</li>
              }
            </ul>
          </div>
          <p style={{ margin: '4px 0', color: '#000000' }}><strong>Harvest Timing:</strong> {analysis.recommendations.harvest}</p>
        </div>
      </div>

      {/* Ayurvedic Notes */}
      {analysis.ayurvedic_notes && analysis.ayurvedic_notes !== 'No additional notes available' && (
        <div style={{
          backgroundColor: '#fefce8',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #fde68a'
        }}>
          <h4 style={{ color: '#a16207', fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
            🌿 Ayurvedic Notes
          </h4>
          <p style={{ fontSize: '14px', margin: '0', lineHeight: '1.4', color: '#000000' }}>{analysis.ayurvedic_notes}</p>
        </div>
      )}
    </div>
  );
}

export default function GeminiAnalyzer() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [showConciseView, setShowConciseView] = useState(true);

  // Transform detailed Gemini response to concise format
  const transformToConciseFormat = (detailedResponse) => {
    if (!detailedResponse) return null;

    const concise = {
      plant: {
        name: detailedResponse.plant_identification?.common_name || 'Unknown',
        scientific: detailedResponse.plant_identification?.scientific_name || 'N/A',
        confidence: detailedResponse.plant_identification?.confidence || 'Unknown'
      },
      health: {
        status: detailedResponse.health_status?.overall_health || 'Unknown',
        score: `${detailedResponse.health_status?.health_score || '0'}/10`,
        issues: detailedResponse.health_status?.visible_symptoms?.length > 0 
          ? detailedResponse.health_status.visible_symptoms.join(', ') 
          : 'None detected'
      },
      quality: {
        rating: `${detailedResponse.quality_assessment?.quality_rating || '0'}/10`,
        market_ready: detailedResponse.quality_assessment?.harvest_readiness || 'Unknown',
        summary: detailedResponse.quality_assessment?.marketability || 'No assessment available'
      },
      diseases: {
        found: detailedResponse.disease_detection?.diseases_found?.length > 0 
          ? detailedResponse.disease_detection.diseases_found 
          : ['None detected'],
        severity: detailedResponse.disease_detection?.severity || 'None',
        pests: detailedResponse.disease_detection?.pest_issues?.length > 0 
          ? detailedResponse.disease_detection.pest_issues 
          : ['None detected']
      },
      recommendations: {
        immediate: detailedResponse.recommendations?.immediate_actions?.slice(0, 3) || ['No immediate actions needed'],
        care: detailedResponse.recommendations?.best_practices?.slice(0, 2) || ['Standard care practices'],
        harvest: detailedResponse.recommendations?.harvest_timing || 'Follow standard guidelines'
      },
      ayurvedic_notes: detailedResponse.additional_notes || 'No additional notes available'
    };

    return concise;
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError(null);
      setAnalysisResult(null);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Create FormData to send image to backend API
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Call our secure backend API
      const response = await fetch('/api/analyze-plant', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || result.details || 'Analysis failed');
      }

      setAnalysisResult(result.analysis);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#ffffff'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center'
      }}>
        🌿 Gemini Plant Analyzer
      </h2>

      {/* File Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
          color: '#000000'
        }}>
          Select Plant Image for Analysis
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{
            width: '100%',
            padding: '10px',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer'
          }}
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{
            position: 'relative',
            width: '300px',
            height: '300px',
            margin: '0 auto',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Image
              src={imagePreview}
              alt="Selected plant"
              fill
              style={{
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={analyzeImage}
        disabled={!selectedImage || isAnalyzing}
        style={{
          width: '100%',
          padding: '12px 24px',
          backgroundColor: isAnalyzing ? '#6b7280' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
          transition: 'background-color 0.2s'
        }}
      >
        {isAnalyzing ? '🔄 Analyzing Plant...' : '🔍 Analyze Plant'}
      </button>

      {/* Loading State */}
      {isAnalyzing && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '18px', color: '#0369a1' }}>
            🤖 Gemini AI is analyzing your plant...
          </div>
          <div style={{ fontSize: '14px', color: '#000000', marginTop: '8px' }}>
            This may take a few moments
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results Display */}
      {analysisResult && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#166534',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📊 Analysis Results
            </h3>
            
            {/* View Toggle */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConciseView(true)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: showConciseView ? '#16a34a' : '#e5e7eb',
                  color: showConciseView ? 'white' : '#374151'
                }}
              >
                📋 Summary
              </button>
              <button
                onClick={() => setShowConciseView(false)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  backgroundColor: !showConciseView ? '#16a34a' : '#e5e7eb',
                  color: !showConciseView ? 'white' : '#374151'
                }}
              >
                🔍 Detailed JSON
              </button>
            </div>
          </div>

          {showConciseView ? (
            /* Concise View */
            <ConciseResultsView analysis={transformToConciseFormat(analysisResult)} />
          ) : (
            /* Detailed JSON View */
            <div style={{
              backgroundColor: '#white',
              borderRadius: '8px',
              padding: '15px',
              border: '1px solid #e5e7eb',
              fontFamily: 'monospace'
            }}>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                margin: '0',
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#000000'
              }}>
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          )}

          {/* Quick Summary Cards - if structured data is available */}
          {analysisResult.plant_identification && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                
                {/* Plant ID Card */}
                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <h4 style={{ color: '#1e40af', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                    🌱 Plant Identification
                  </h4>
                  <p><strong>Common:</strong> {analysisResult.plant_identification.common_name}</p>
                  <p><strong>Scientific:</strong> {analysisResult.plant_identification.scientific_name}</p>
                  <p><strong>Confidence:</strong> {analysisResult.plant_identification.confidence}</p>
                </div>

                {/* Health Status Card */}
                {analysisResult.health_status && (
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <h4 style={{ color: '#166534', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      💚 Health Status
                    </h4>
                    <p><strong>Overall:</strong> {analysisResult.health_status.overall_health}</p>
                    <p><strong>Score:</strong> {analysisResult.health_status.health_score}/10</p>
                  </div>
                )}

                {/* Quality Card */}
                {analysisResult.quality_assessment && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid #fed7aa'
                  }}>
                    <h4 style={{ color: '#92400e', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>
                      ⭐ Quality Rating
                    </h4>
                    <p><strong>Rating:</strong> {analysisResult.quality_assessment.quality_rating}/10</p>
                    <p><strong>Market Ready:</strong> {analysisResult.quality_assessment.marketability}</p>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
