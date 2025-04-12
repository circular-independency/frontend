import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PromptInputComponent } from '../../shared/prompt-input/prompt-input.component';

export interface DialogData {
  day: string;
  mealType?: string;
  mealName?: string;
}

@Component({
  selector: 'app-menu-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, PromptInputComponent],
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.scss'
})
export class MenuDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onPromptSubmit(prompt: string): void {
    console.log('Prompt submitted:', prompt);
    // Handle the prompt submission here
  }
} 