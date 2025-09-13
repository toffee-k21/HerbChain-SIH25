import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { calculateCredibilityScore } from '@/utils/credibilityScoring';

// Initialize Gemini AI with server-side API key (hidden from frontend)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyAno_0QOSy_4XaooY1bRydhd0IQMMtCzI8');

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const formData = await request.formData();
    const file = formData.get('image') as File;
    console.log(formData);
    const location = formData.get('location') as string;
    const latitude = location.split(',')[0];
    const longitude = location.split(',')[1];
    const timestamp = formData.get('timestamp') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64 for Gemini API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    const imagePart = {
      inlineData: {
        data: base64,
        mimeType: file.type,
      },
    };

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 🌿 UPDATED PROMPT - Now includes location awareness
    const prompt = ` 
Analyze this plant image with geographical intelligence. You will receive location coordinates and should use your knowledge of agricultural zones, climate patterns, and regional suitability to provide a comprehensive assessment. 

USER PROVIDED GEO-DATA: 
- Coordinates: Latitude ${latitude}, Longitude ${longitude} 
- Collection Time: ${timestamp} 

Provide analysis in this exact JSON format: 
{ 
  "plant_identification": { 
    "common_name": "Common name", 
    "scientific_name": "Scientific name", 
    "family": "Plant family", 
    "confidence": "High/Medium/Low" 
  }, 
  "geographical_suitability": { 
    "region_analysis": "Brief analysis of this region's agricultural characteristics", 
    "suitability_score": 0-10, 
    "optimal_growing_conditions": ["Condition 1", "Condition 2"], 
    "potential_challenges": ["Challenge 1", "Challenge 2"] 
  }, 
  "health_status": { 
    "overall_health": "Health status", 
    "health_score": 0-10, 
    "visible_symptoms": ["Symptom 1", "Symptom 2"] 
  }, 
  "quality_assessment": { 
    "quality_rating": 0-10, 
    "harvest_readiness": "Yes/No/Partial", 
    "marketability": "Assessment text" 
  }, 
  "disease_detection": { 
    "diseases_found": ["Disease 1", "Disease 2"], 
    "severity": "None/Mild/Moderate/Severe", 
    "pest_issues": ["Pest 1", "Pest 2"] 
  }, 
  "recommendations": { 
    "immediate_actions": ["Action 1", "Action 2"], 
    "best_practices": ["Practice 1", "Practice 2"], 
    "harvest_timing": "Recommendation text" 
  }, 
  "validation_metrics": { 
    "location_consistency": true/false, 
    "seasonal_appropriateness": true/false, 
    "confidence_score": 0-100 
  } 
} 


Return ONLY valid JSON without any additional text.`;

    // Generate analysis
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON response
    let parsedResult;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        parsedResult = { raw_response: text };
      }
    } catch (parseError) {
      parsedResult = {
        raw_response: text,
        parse_error: 'Could not parse as JSON'
      };
    }

    // Calculate credibility score
    const credibilityScore = calculateCredibilityScore(
      {
        common_name: parsedResult.plant_identification?.common_name || '',
        scientific_name: parsedResult.plant_identification?.scientific_name || '',
        confidence_score: parsedResult.validation_metrics?.confidence_score || 0
      },
      {
        latitude,
        longitude,
        timestamp
      },
      {
        health_score: parsedResult.health_status?.health_score || 0,
        quality_rating: parsedResult.quality_assessment?.quality_rating || 0,
        diseases_detected: parsedResult.health_status?.visible_symptoms || []
      }
    );

    const responseData = {
      success: true,
      analysis: parsedResult,
      location_data: {
        latitude,
        longitude,
        timestamp
      },
      credibility_score: credibilityScore
    };
    
    // console.log('API Response Data:', responseData);
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  // Create a mock response with credibility score for testing
  const mockResponse = {
    success: true,
    analysis: {
      plant_identification: {
        common_name: 'Test Plant',
        scientific_name: 'Testus Plantus',
        confidence: 'High'
      },
      health_status: {
        overall_health: 'Good',
        health_score: 8,
        visible_symptoms: []
      },
      quality_assessment: {
        quality_rating: 7,
        harvest_readiness: 'Yes',
        marketability: 'Good market value'
      },
      disease_detection: {
        diseases_found: [],
        severity: 'None',
        pest_issues: []
      },
      recommendations: {
        immediate_actions: ['Water regularly'],
        best_practices: ['Maintain soil pH'],
        harvest_timing: 'Ready for harvest'
      }
    },
    credibility_score: {
      overall_score: 85,
      risk_level: 'LOW',
      breakdown: {
        geographical: { score: 35, reasoning: 'Plant is native to region' },
        seasonal: { score: 25, reasoning: 'Appropriate season for growth' },
        ai_analysis: { score: 25, reasoning: 'High confidence in identification' }
      },
      recommendations: ['Verify with local expert'],
      warning_flags: []
    }
  };

  console.log('Returning mock data with credibility_score:', mockResponse.credibility_score);
  
  return NextResponse.json(mockResponse);
}