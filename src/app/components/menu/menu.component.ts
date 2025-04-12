import { Component } from '@angular/core';
import { MenuPromptComponent } from './menu-prompt/menu-prompt.component';
@Component({
  selector: 'app-menu',
  imports: [MenuPromptComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuExists = false;
}
