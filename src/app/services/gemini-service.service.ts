import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment';
import { mealPlanSchema } from './schemas/meal-plan.schema';
import { WeeklyMealPlan } from './schemas/meal-plan.schema';
import { suggestionsSchema } from './schemas/suggestions-schema';

const preprompt = `
  You are a helpful assistant that can help me generate and update my meal plan.
  You will be given a prompt and sometimes an existing meal plan.
  You will need to update the meal plan based on the prompt, or generate a new meal plan when asked.
  You will need to return the updated meal plan in the same format as the original meal plan.
  Make sure that all the units are in grams, and ONLY grams. 
  Be sure to list ALL the raw ingredients for each meal except for spices and seasonings, and the measurements for each ingredient.
`;

@Injectable({
  providedIn: 'root',
})
export class GeminiServiceService {
  private genAI: GoogleGenAI;

  activePrompt = signal({
    name: '',
    active: false,
  });

  constructor() {
    this.genAI = new GoogleGenAI({ apiKey: environment.geminiApiKey });
  }

  async generateJsonResponse(
    promptName: string,
    prompt: string,
    jsonSchema: any
  ): Promise<any> {
    try {
      this.activePrompt.set({
        name: promptName,
        active: true,
      });

      const result = await this.genAI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: preprompt + prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: jsonSchema,
        },
      });

      this.activePrompt.set({
        name: promptName,
        active: false,
      });

      return JSON.parse(result.text ?? '');
    } catch (error) {
      console.error('Error generating JSON response:', error);
      throw error;
    }
  }

  generateMealPlan(prompt: string): Promise<WeeklyMealPlan> {
    const pr = `Generate a meal plan for the week based on the following information: ${prompt}`;
    return this.generateJsonResponse('mealPlanInitial', pr, mealPlanSchema);
  }

  updateMealPlanDay(
    prompt: string,
    mealPlan: WeeklyMealPlan,
    day: string
  ): Promise<WeeklyMealPlan> {
    const pr = `Update the meal plan for ${day} based on the following information: ${prompt}. The current meal plan is: ${JSON.stringify(
      mealPlan
    )}.
    Make sure to update the meal plan in the same format as the original meal plan.
    Be sure to just update the specific meals for ${day} that are being updated, and leave everything else EXACTLY the same`;
    return this.generateJsonResponse('mealPlanUpdateDay', pr, mealPlanSchema);
  }

  updateMealPlanMeal(
    prompt: string,
    mealPlan: WeeklyMealPlan,
    day: string,
    mealType: string
  ): Promise<WeeklyMealPlan> {
    const pr = `Update the ${mealType} meal for ${day} based on the following information: ${prompt}. The current meal plan is: ${JSON.stringify(
      mealPlan
    )}.
    Make sure to update the meal plan in the same format as the original meal plan.
    Be sure to just update the specific meals for ${day} and ${mealType} that are being updated, and leave everything else EXACTLY the same`;
    return this.generateJsonResponse(
      'mealPlanUpdateSingleMeal',
      pr,
      mealPlanSchema
    );
  }

  updateMeal(
    prompt: string,
    mealPlan: WeeklyMealPlan,
    mealName: string
  ): Promise<WeeklyMealPlan> {
    const pr = `Update the meal plan for ${mealName} based on the following information: ${prompt}. The current meal plan is: ${JSON.stringify(
      mealPlan
    )}.
    Make sure to update the meal plan in the same format as the original meal plan.
    Be sure to just update the specific meals for ${mealName} that are being updated, and leave everything else EXACTLY the same`;
    return this.generateJsonResponse('mealPlanUpdateMeal', pr, mealPlanSchema);
  }

  suggestionsPostprompt = `
  Make sure that the suggestions are not too long, but specific.
  `

  async promptSuggestionsJson(prompt: string) {
    const result = await this.genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt + this.suggestionsPostprompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: suggestionsSchema,
      },
    });

    return JSON.parse(result.text ?? '').suggestions;
  }

  generateGeneralGenerationSuggestions(): Promise<string[]> {
    const pr = `Generate a list of suggestions for general meal plan generation. 
    Return the suggestions in a JSON array like ${JSON.stringify(suggestionsSchema)}
    Make sure that the suggestions are specific to meal plan generation, and not general cooking suggestions.
    Make sure that the suggestions are inovative.
    Generate exactly 5 suggestions.
    `;
    return this.promptSuggestionsJson(pr);
  }

  generateGeneralUpdateSuggestions(context: string): Promise<string[]> {
    const pr = `Generate a list of suggestions for updating an existing meal plan.
    The current relevant meal plan is: ${context}.
    Return the suggestions in a JSON array like ${JSON.stringify(suggestionsSchema)}
    Make sure that the suggestions are specific to meal plan updates, such as changing ingredients, portions, or meal types.
    Make sure that the suggestions are innovative and practical for modifying existing meal plans.
    Generate exactly 5 suggestions.`;
    return this.promptSuggestionsJson(pr);
  }

  generateSpecificUpdateSuggestions(context: string): Promise<string[]> {
    const pr = `Generate a list of suggestions for updating specific days in a meal plan.
    The current relevant meal plan is: ${context}.
    Return the suggestions in a JSON array like ${JSON.stringify(suggestionsSchema)}
    Make sure that the suggestions are specific to modifying daily meal plans, such as swapping meals between days or adjusting daily nutrition.
    Make sure that the suggestions are practical and maintain the overall weekly meal plan structure.
    Generate exactly 3 suggestions.`;
    return this.promptSuggestionsJson(pr);
  }

  generateSpecificUpdateSuggestionsSingleMeal(mealName: string): Promise<string[]> {
    console.log('mealName', mealName);
    const pr = `Generate a list of suggestions for updating the meal "${mealName}" in a meal plan.
    Make sure that the suggestions are specific to modifying the meal "${mealName}", such as ingredient substitutions or portion adjustments.
    Return the suggestions in a JSON array like ${JSON.stringify(suggestionsSchema)}
    Make sure that the suggestions are practical and maintain the nutritional balance of the meal.
    Generate exactly 3 suggestions.`;
    return this.promptSuggestionsJson(pr);
  }
}
