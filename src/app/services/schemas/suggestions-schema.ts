import { Type } from "@google/genai";

export const suggestionsSchema = {
  type: Type.OBJECT,
  properties: {
    suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
  }
}
