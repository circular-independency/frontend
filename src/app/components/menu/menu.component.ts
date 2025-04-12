import { Component, inject } from '@angular/core';
import { MenuPromptComponent } from './menu-prompt/menu-prompt.component';
import { GeminiServiceService } from '../../services/gemini-service.service';
@Component({
  selector: 'app-menu',
  imports: [MenuPromptComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  private geminiService = inject(GeminiServiceService);
  menuExists = false;
  onPromptSubmit(prompt: string) {
    this.geminiService.generateMealPlan(prompt).then((mealPlan) => {
      console.log('Meal plan generated:', mealPlan);
    });
  }
}
