import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-input',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './prompt-input.component.html',
  styleUrl: './prompt-input.component.scss'
})
export class PromptInputComponent {
  @Input() placeholder: string = 'Type something...';
  @Output() promptSubmit = new EventEmitter<string>();

  prompt: string = '';

  onSubmit() {
    if (this.prompt.trim()) {
      this.promptSubmit.emit(this.prompt);
      this.prompt = ''; // Clear the input after submission
    }
  }
}
