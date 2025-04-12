import { inject, Injectable, signal } from '@angular/core';
import { GeminiServiceService } from './gemini-service.service';

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private geminiService = inject(GeminiServiceService);

  getGeneralGenerationSuggestions() {
    return this.geminiService.generateGeneralGenerationSuggestions();
  }

  getGeneralUpdateSuggestions(context: string) {
    return this.geminiService.generateGeneralUpdateSuggestions(context);
  }

  getSpecificUpdateSuggestions(context: string) {
    return this.geminiService.generateSpecificUpdateSuggestions(context);
  }

  getSpecificUpdateSuggestionsSingleMeal(mealName: string) {
    return this.geminiService.generateSpecificUpdateSuggestionsSingleMeal(mealName);
  }

}
