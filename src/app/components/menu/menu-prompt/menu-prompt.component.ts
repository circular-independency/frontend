import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PromptInputComponent } from '../../shared/prompt-input/prompt-input.component';
import { GeminiServiceService } from '../../../services/gemini-service.service';
import { mealPlanSchema } from '../../../services/schemas/meal-plan.schema';

@Component({
  selector: 'app-menu-prompt',
  standalone: true,
  imports: [
    MatIconModule,
    PromptInputComponent
  ],
  templateUrl: './menu-prompt.component.html',
  styleUrl: './menu-prompt.component.scss'
})
export class MenuPromptComponent {
  @Output() menuGenerated = new EventEmitter<any>();

  private geminiService = inject(GeminiServiceService);

  loading = computed(() => this.geminiService.activePrompt().active);

  async onPromptSubmit(prompt: string) {
    const menu = await this.geminiService.generateJsonResponse('mealPlanInitial', prompt, mealPlanSchema);
    this.menuGenerated.emit(menu);
  }
}
