import { Component, computed, Inject } from '@angular/core';
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
  day: string;
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
  ) {}

  loading = computed(() => {
    return this.geminiService.activePrompt().active;
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onPromptSubmit(prompt: string): Promise<void> {

    if (this.data.mealType) {
      const response = await this.geminiService.updateMealPlanMeal(
        prompt,
        this.data.menu,
        this.data.day,
        this.data.mealType
      );
      this.dialogRef.close(response);
    } else {
      const response = await this.geminiService.updateMealPlanDay(
        prompt,
        this.data.menu,
        this.data.day
      );
      this.dialogRef.close(response);
    }
  }
}
