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
    </div>
  );
}

export default function GeminiAnalyzer({file, setFile, details, setDetails}) {
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
      setDetails(JSON.stringify(result.analysis));
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
      // margin: '20px auto',
      // padding: '20px',
      // border: '1px solid #374151',
      borderRadius: '12px',
      // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
      // backgroundColor: '#111827'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#d1d5db',
        textAlign: 'center'
      }}>
        {/* 🌿 Predict the crop health */}
      </h2>

      {/* File Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
          color: '#d1d5db'
        }}>
          Select Plant Image of Plant
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          style={{
            width: '100%',
            padding: '10px',
            border: '2px dashed #4b5563',
            borderRadius: '8px',
            backgroundColor: '#1f2937',
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
            border: '1px solid #374151',
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
          backgroundColor: isAnalyzing ? '#374151' : '#15803d',
          color: '#d1d5db',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isAnalyzing ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
          transition: 'background-color 0.2s'
        }}
      >
        {isAnalyzing ? '🔄 Analyzing Plant...' : 'Run The Herb Health Check'}
      </button>

      {/* Loading State */}
      {isAnalyzing && (
        <div style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#083344',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '18px', color: '#7dd3fc' }}>
            Analyzing the Data Set plase wait...
          </div>
          <div style={{ fontSize: '14px', color: '#d1d5db', marginTop: '8px' }}>
            This may take a few moments
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div style={{
          padding: '15px',
          backgroundColor: '#450a0a',
          border: '1px solid #b91c1c',
          borderRadius: '8px',
          color: '#f87171',
          marginBottom: '20px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Results Display */}
      {analysisResult && (
        <div style={{
          backgroundColor: '#052e16',
          border: '1px solid #15803d',
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
              color: '#4ade80',
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
                  backgroundColor: showConciseView ? '#15803d' : '#374151',
                  color: '#d1d5db'
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
                  backgroundColor: !showConciseView ? '#15803d' : '#374151',
                  color: '#d1d5db'
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
              // backgroundColor: '#111827',
              // borderRadius: '8px',
              padding: '15px',
              // border: '1px solid #374151',
              fontFamily: 'monospace'
            }}>
              <pre style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                margin: '0',
                fontSize: '12px',
                lineHeight: '1.5',
                color: '#d1d5db'
              }}>
                {JSON.stringify(analysisResult, null, 2)}
              </pre>
            </div>
          )}

        </div>
      )}
    </div>
  );
}