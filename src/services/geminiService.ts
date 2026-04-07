import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini AI Service
 * Uses the environment variable configured in vite.config.ts
 */
const getGeminiKey = () => {
  // Try to get the key from the requested process.env name
  // This is defined in vite.config.ts
  const key = (process.env as any).NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!key || key === "MY_GEMINI_API_KEY") {
    console.warn("Gemini API Key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY.");
    return null;
  }
  return key;
};

let genAI: GoogleGenerativeAI | null = null;

export const getGeminiModel = (modelName: string = "gemini-1.5-flash") => {
  const apiKey = getGeminiKey();
  if (!apiKey) return null;

  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI.getGenerativeModel({ model: modelName });
};

/**
 * Example usage:
 * const model = getGeminiModel();
 * const result = await model.generateContent("Hello");
 */
