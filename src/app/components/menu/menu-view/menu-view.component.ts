import { Component, computed, Input, signal, SimpleChanges } from '@angular/core';
import { WeeklyMealPlan } from '../../../services/schemas/meal-plan.schema';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { menuSample } from '../../../services/schemas/menu-data';
import { MatDialog } from '@angular/material/dialog';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatExpansionModule, MatListModule],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss'
})
export class MenuViewComponent {
  @Input() menuInput: WeeklyMealPlan = menuSample;

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuInput']) {
      this.menu.set(this.menuInput);
    }
  }

  menu = signal<WeeklyMealPlan>(this.menuInput);

  menuList = computed(() => {
    const menu = []
    menu.push({day: 'Monday', meals: this.menu().monday})
    menu.push({day: 'Tuesday', meals: this.menu().tuesday})
    menu.push({day: 'Wednesday', meals: this.menu().wednesday})
    menu.push({day: 'Thursday', meals: this.menu().thursday})
    menu.push({day: 'Friday', meals: this.menu().friday})
    menu.push({day: 'Saturday', meals: this.menu().saturday})
    menu.push({day: 'Sunday', meals: this.menu().sunday})
    return menu;
  });
  
  expandedDay: string | null = null;

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  onDayClick(day: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.openDialog(day);
  }

  onMealClick(day: string, mealType: string, mealName: string) {
    this.openDialog(day, mealType, mealName);
  }

  private openDialog(day: string, mealType?: string, mealName?: string) {
    const ref = this.dialog.open(MenuDialogComponent, {
      width: '600px',
      panelClass: 'menu-dialog',
      data: { day, mealType, mealName, menu: this.menu() }
    });

    ref.afterClosed().subscribe((result: any) => {
      if (result) {
        this.menu.set(result);
      }
    });
  }
}
