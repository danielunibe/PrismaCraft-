
import { GoogleGenAI, Type } from "@google/genai";
import { CraftData } from "../types";

export const decomposePrompt = async (prompt: string): Promise<CraftData | null> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const schema = {
      type: Type.OBJECT,
      properties: {
        context: { type: Type.STRING, description: 'The context of the prompt. Provide background information, constraints, or any other relevant details.' },
        role: { type: Type.STRING, description: 'The role the AI should assume. What persona should it adopt?' },
        action: { type: Type.STRING, description: 'The specific action the AI should perform. What is the primary task?' },
        format: { type: Type.STRING, description: 'The desired format of the output. How should the response be structured? (e.g., list, JSON, paragraph).' },
        target: { type: Type.STRING, description: 'The target audience or user for the response.' },
      },
      required: ['context', 'role', 'action', 'format', 'target']
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following user idea and decompose it into the CRAFT prompt engineering framework. CRAFT stands for: Context, Role, Action, Format, Target. Provide a concise analysis for each part based on the user's idea. User Idea: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });
    
    // Per @google/genai guidelines, the `.text` property on the response is a string.
    const jsonString = response.text.trim();
    const parsedData = JSON.parse(jsonString);

    return parsedData as CraftData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};