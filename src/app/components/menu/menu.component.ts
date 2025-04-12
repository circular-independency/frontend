import { Component, inject, signal } from '@angular/core';
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
  menuExists = signal(false);


  onMenuGenerated(menu: any) {
    this.menuExists.set(true);
    console.log('Menu generated:', menu);
  }
}
