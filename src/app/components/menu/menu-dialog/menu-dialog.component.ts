import { Component, computed, effect, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PromptInputComponent } from '../../shared/prompt-input/prompt-input.component';
import { GeminiServiceService } from '../../../services/gemini-service.service';
import { WeeklyMealPlan } from '../../../services/schemas/meal-plan.schema';

export interface DialogData {
  day?: string;
  mealType?: string;
  mealName?: string;
  menu: WeeklyMealPlan;
}

@Component({
  selector: 'app-menu-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    PromptInputComponent,
  ],
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.scss',
})
export class MenuDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private geminiService: GeminiServiceService
  ) {
  }

  loading = computed(() => {
    return this.geminiService.activePrompt().active;
  });

  suggestionsType = computed(() => {
    if (this.data.mealType) {
      return 'specificUpdateSingleMeal';
    } else if (this.data.mealName && !this.data.day) {
      return 'specificUpdate';
    } else if (this.data.day) {
      return 'specificUpdate';
    } else {
      return 'generalGeneration';
    }
  });

  suggestionsContext = computed(() => {
    if (this.data.mealName) {
      return this.data.mealName;
    } else if (this.data.day) {
      const dayMenu = this.data.menu[this.data.day.toLowerCase() as keyof WeeklyMealPlan];
      if (!dayMenu) return '';
      return `Breakfast: ${dayMenu.breakfast.name}, Lunch: ${dayMenu.lunch.name}, Dinner: ${dayMenu.dinner.name}`;
    } else if (this.data.mealType) {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      const mealNames = days.map(day => {
        const dayMenu = this.data.menu[day as keyof WeeklyMealPlan];
        if (!dayMenu || !dayMenu[this.data.mealType as keyof typeof dayMenu]) return '';
        return `${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayMenu[this.data.mealType as keyof typeof dayMenu].name}`;
      }).filter(Boolean);
      return mealNames.join(', ');
    } else {
      return '';
    }
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onPromptSubmit(prompt: string): Promise<void> {

    if (this.data.mealType) {
      const response = await this.geminiService.updateMealPlanMeal(
        prompt,
        this.data.menu,
        this.data.day ?? '',
        this.data.mealType
      );
      this.dialogRef.close(response);
    } else if (this.data.mealName && !this.data.day) {
      const response = await this.geminiService.updateMeal(
        prompt,
        this.data.menu,
        this.data.mealName
      );
      this.dialogRef.close(response);
    } else {
      const response = await this.geminiService.updateMealPlanDay(
        prompt,
        this.data.menu,
        this.data.day ?? ''
      );
      this.dialogRef.close(response);
    }
  }
}
