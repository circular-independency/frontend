import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';
import { mealPlanSchema } from './schemas/meal-plan.schema';
import { WeeklyMealPlan } from './schemas/meal-plan.schema';

@Injectable({
  providedIn: 'root'
})
export class GeminiServiceService {
  private genAI: GoogleGenAI;

  activePrompt = signal({
    name: '', 
    active: false
  })

  constructor() {
    this.genAI = new GoogleGenAI({apiKey: environment.geminiApiKey});
  }

  async generateJsonResponse(promptName: string, prompt: string, jsonSchema: any): Promise<any> {
    try {

      this.activePrompt.set({
        name: promptName,
        active: true
      })

      const result = await this.genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: jsonSchema
        },
      });

      this.activePrompt.set({
        name: promptName,
        active: false
      })

      return JSON.parse(result.text ?? '');
    } catch (error) {
      console.error('Error generating JSON response:', error);
      throw error;
    }
  }

  // Helper method to validate JSON against schema
  validateJsonResponse(response: any, schema: any): boolean {
    // Basic validation - you might want to use a more robust schema validation library
    try {
      const schemaKeys = Object.keys(schema);
      const responseKeys = Object.keys(response);
      
      return schemaKeys.every(key => responseKeys.includes(key));
    } catch (error) {
      console.error('Error validating JSON response:', error);
      return false;
    }
  }
  
  generateMealPlan(prompt: string): Promise<WeeklyMealPlan> {
    const pr = `Generate a meal plan for the week based on the following information: ${prompt}`;
    return this.generateJsonResponse('mealPlanInitial', pr, mealPlanSchema);
  }
}
