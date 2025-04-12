import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PromptInputComponent } from '../../shared/prompt-input/prompt-input.component';

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

  @Output() promptSubmit = new EventEmitter<string>();

  onPromptSubmit(prompt: string) {
    this.promptSubmit.emit(prompt);
  }
}
