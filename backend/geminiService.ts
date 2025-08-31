import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class GeminiService {
  async refineDescription(description: string): Promise<string> {
    try {
      const prompt = `Rewrite this challenge description to be catchy, engaging, and TikTok-friendly. 
                      Make it short, DO NOT use emojis, but make it sound enticing. 
                      Return only the improved description, nothing else: "${description}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      console.log('Gemini refineDescription raw response:', response);

      return response.text || description;
    } catch (err) {
      console.error('Error refining description:', err);
      return description;
    }
  }

  async checkContentSafety(title: string, description: string): Promise<{ safe: boolean; issues: string[] }> {
    try {
      const prompt = `Analyze this content for safety and appropriateness. Check for:
      1. Hate speech, violence, or harmful content
      2. Inappropriate or adult content
      3. Dangerous challenges or activities
      4. Copyright violations
      
      Title: "${title}"
      Description: "${description}"
      
      Respond with only "SAFE" if content is appropriate, or list specific safety issues if not.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      console.log('Gemini checkContentSafety raw response:', response);

      const text = response.text || '';
      if (text.trim().toUpperCase() === 'SAFE') return { safe: true, issues: [] };
      return { safe: false, issues: [text] };
    } catch (err) {
      console.error('Error checking content safety:', err);
      return { safe: true, issues: [] };
    }
  }
}

export const geminiService = new GeminiService();
