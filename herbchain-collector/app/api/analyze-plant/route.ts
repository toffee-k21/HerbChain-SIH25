import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI with server-side API key (hidden from frontend)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyAno_0QOSy_4XaooY1bRydhd0IQMMtCzI8');

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const formData = await request.formData();
    const file = formData.get('image') as File;

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

    // Create detailed prompt for plant analysis
    const prompt = `Analyze this plant image and provide a comprehensive assessment in JSON format with the following structure:
    {
      "plant_identification": {
        "common_name": "Common name of the plant",
        "scientific_name": "Scientific/botanical name",
        "family": "Plant family",
        "confidence": "Confidence level (High/Medium/Low)"
      },
      "health_status": {
        "overall_health": "Overall health status",
        "health_score": "Score from 1-10",
        "visible_symptoms": ["List of any visible symptoms or issues"]
      },
      "disease_detection": {
        "diseases_found": ["List any diseases detected"],
        "pest_issues": ["List any pest problems visible"],
        "deficiency_signs": ["Nutritional deficiency signs if any"],
        "severity": "Severity level (None/Mild/Moderate/Severe)"
      },
      "quality_assessment": {
        "quality_rating": "Rating from 1-10",
        "marketability": "Market quality assessment",
        "harvest_readiness": "Ready for harvest? (Yes/No/Partial)",
        "storage_potential": "Storage potential assessment"
      },
      "recommendations": {
        "immediate_actions": ["Immediate care recommendations"],
        "treatment_suggestions": ["Treatment or intervention suggestions"],
        "best_practices": ["General care recommendations"],
        "harvest_timing": "Optimal harvest timing advice"
      },
      "additional_notes": "Any other relevant observations"
    }
    
    Please analyze the image carefully and provide accurate, detailed information for Ayurvedic herb cultivation and quality assessment. Return ONLY valid JSON without any markdown formatting.`;

    // Generate analysis
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    // Try to parse JSON response
    let parsedResult;
    try {
      // Extract JSON from response (sometimes AI includes markdown formatting)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        parsedResult = { raw_response: text };
      }
    } catch (parseError) {
      parsedResult = { 
        raw_response: text, 
        parse_error: 'Could not parse as JSON',
        error_details: parseError
      };
    }

    return NextResponse.json({
      success: true,
      analysis: parsedResult
    });

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
  return NextResponse.json({
    message: 'Plant Analysis API is running',
    endpoint: 'POST /api/analyze-plant',
    usage: 'Send plant images for AI analysis'
  });
}