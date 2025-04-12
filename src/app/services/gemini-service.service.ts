import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';
import { mealPlanSchema } from './schemas/meal-plan.schema';
import { WeeklyMealPlan } from './schemas/meal-plan.schema';

const preprompt = `
  You are a helpful assistant that can help me generate and update my meal plan.
  You will be given a prompt and sometimes an existing meal plan.
  You will need to update the meal plan based on the prompt, or generate a new meal plan when asked.
  You will need to return the updated meal plan in the same format as the original meal plan.
  Make sure that all the units are in grams, and ONLY grams. 
`;

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
        contents: preprompt + prompt,
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

  updateMealPlanDay(prompt: string, mealPlan: WeeklyMealPlan, day: string): Promise<WeeklyMealPlan> {
    const pr = `Update the meal plan for ${day} based on the following information: ${prompt}. The current meal plan is: ${JSON.stringify(mealPlan)}.
    Make sure to update the meal plan in the same format as the original meal plan.
    Be sure to just update the specific meals for ${day} that are being updated, and leave everything else EXACTLY the same`;
    return this.generateJsonResponse('mealPlanUpdateDay', pr, mealPlanSchema);
  }

  updateMealPlanMeal(prompt: string, mealPlan: WeeklyMealPlan, day: string, mealType: string): Promise<WeeklyMealPlan> {
    const pr = `Update the ${mealType} meal for ${day} based on the following information: ${prompt}. The current meal plan is: ${JSON.stringify(mealPlan)}.
    Make sure to update the meal plan in the same format as the original meal plan.
    Be sure to just update the specific meals for ${day} and ${mealType} that are being updated, and leave everything else EXACTLY the same`;
    return this.generateJsonResponse('mealPlanUpdateMeal', pr, mealPlanSchema);
  }
}
