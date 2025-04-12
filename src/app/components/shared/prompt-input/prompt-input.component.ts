import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.scss'
})
export class PromptInputComponent {
  @Input() placeholder: string = 'Type something...';
  @Input() loading: boolean = false;

  @Output() promptSubmit = new EventEmitter<string>();

  prompt: string = '';

  onSubmit() {
    if (this.prompt.trim() && !this.loading) {
      this.promptSubmit.emit(this.prompt);
    }
  }
}
