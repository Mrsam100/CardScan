
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractContactFromImage = async (base64Image: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
            { text: "Analyze this image. If it is a business card, extract the contact details. If it contains a QR code, decode its content and parse any contact information found within it. Return valid JSON only with fields: name, jobTitle, company, email, phone, linkedinUrl." }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            jobTitle: { type: Type.STRING },
            company: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            linkedinUrl: { type: Type.STRING },
          },
          required: ["name", "company"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("OCR/QR Decoding Error:", error);
    return null;
  }
};

export const getEnrichment = async (name: string, company: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Sam says we need AI enrichment. Based on the contact ${name} at ${company}, generate a one-sentence icebreaker mentioning potential recent company news or posts. Keep it professional.`,
    });
    return response.text || "No insights found.";
  } catch (error) {
    return "Enrichment currently unavailable.";
  }
};

// Fix: Added missing sendMessageToGemini for Assistant.tsx
export const sendMessageToGemini = async (history: {role: string, text: string}[], message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "You are Schroeder Assistant, an AI Literacy Guide for CardScan. You help users destroy friction in networking. You provide insights on digital safety, AI productivity, and CRM integration.",
      }
    });
    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "The AI service is currently having issues. Please try again soon.";
  }
};
