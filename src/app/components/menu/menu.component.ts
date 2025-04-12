import { Component, inject, signal } from '@angular/core';
import { MenuPromptComponent } from './menu-prompt/menu-prompt.component';
import { GeminiServiceService } from '../../services/gemini-service.service';
import { WeeklyMealPlan } from '../../services/schemas/meal-plan.schema';
import { menuSample } from '../../services/schemas/menu-data';
import { MenuViewComponent } from "./menu-view/menu-view.component";
@Component({
  selector: 'app-menu',
  imports: [MenuPromptComponent, MenuViewComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menu = signal<WeeklyMealPlan>(menuSample);
  menuExists = signal(false);

  onMenuGenerated(menu: any) {
    this.menuExists.set(true);
    this.menu.set(menu);
  }
}
