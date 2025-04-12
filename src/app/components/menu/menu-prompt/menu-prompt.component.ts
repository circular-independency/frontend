import { Component } from '@angular/core';
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
  onPromptSubmit(prompt: string) {
    console.log('Menu prompt submitted:', prompt);
    // Add your menu generation logic here
  }
}
