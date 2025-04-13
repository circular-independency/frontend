import {
  Component,
  computed,
  Input,
  signal,
  SimpleChanges,
} from '@angular/core';
import { WeeklyMealPlan, Ingredient } from '../../../services/schemas/meal-plan.schema';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { menuSample } from '../../../services/schemas/menu-data';
import { MatDialog } from '@angular/material/dialog';
import { MenuDialogComponent } from '../menu-dialog/menu-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PromptInputComponent } from '../../shared/prompt-input/prompt-input.component';
import { GeminiServiceService } from '../../../services/gemini-service.service';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    PromptInputComponent,
    MatProgressSpinnerModule,
  ],
  providers: [ApiService],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss',
})
export class MenuViewComponent {
  @Input() menuInput: WeeklyMealPlan = menuSample;

  constructor(
    private dialog: MatDialog,
    private geminiService: GeminiServiceService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuInput']) {
      this.menu.set(this.menuInput);
    }
  }

  menu = signal<WeeklyMealPlan>(this.menuInput);

  menuJson = computed(() => JSON.stringify(this.menu()));

  loadingShoppingList = signal(false);

  menuList = computed(() => {
    const menu = [];
    menu.push({ day: 'Monday', meals: this.menu().monday });
    menu.push({ day: 'Tuesday', meals: this.menu().tuesday });
    menu.push({ day: 'Wednesday', meals: this.menu().wednesday });
    menu.push({ day: 'Thursday', meals: this.menu().thursday });
    menu.push({ day: 'Friday', meals: this.menu().friday });
    menu.push({ day: 'Saturday', meals: this.menu().saturday });
    menu.push({ day: 'Sunday', meals: this.menu().sunday });
    return menu;
  });

  promptLoading = signal(false);

  expandedDay: string | null = null;

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  onDayClick(day: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.openDialog(day);
  }

  onMealClick(day: string, mealType: string, mealName: string) {
    this.openDialog(day, mealType, mealName);
  }

  onUpdateMeal(mealType: string) {
    this.openDialog('', mealType);
  }

  private openDialog(day?: string, mealType?: string, mealName?: string) {
    const ref = this.dialog.open(MenuDialogComponent, {
      width: '600px',
      panelClass: 'menu-dialog',
      data: {
        day: day ?? '',
        mealType: mealType ?? '',
        mealName: mealName ?? '',
        menu: this.menu(),
      },
    });

    ref.afterClosed().subscribe((result: any) => {
      if (result) {
        const diff = this.compareMealPlans(this.menu(), result);
        console.log(diff);
        this.menu.set(result);
      }
    });
  }

  onPromptSubmit(prompt: string) {
    this.promptLoading.set(true);
    this.geminiService.updateMealPlan(prompt, this.menu()).then((result) => {
      const diff = this.compareMealPlans(this.menu(), result);
      console.log(diff);
      this.menu.set(result);
      this.promptLoading.set(false);
    });
  }

  onGenerateShoppingList() {
    this.loadingShoppingList.set(true); 
    this.apiService.postWeekPlan(this.menu()).subscribe((result) => {
      if (result.status === 200) {
        this.router.navigate(['/shopping-list']);
      }
      this.loadingShoppingList.set(false);
    });
  }

  private flashElements(changes: { day: string; meal: string }[]) {
    // Clear any existing flash classes
    document.querySelectorAll('.meal.flash').forEach(el => {
      el.classList.remove('flash');
    });

    // Add flash class to changed elements
    changes.forEach(change => {
      const element = document.getElementById(`meal-${change.day.toLowerCase()}-${change.meal}`);
      console.log('flashing', `meal-${change.day.toLowerCase()}-${change.meal}`,element);
      if (element) {
        element.classList.add('flash');
      }
    });

    // Remove flash class after animation completes
    setTimeout(() => {
      document.querySelectorAll('.meal.flash').forEach(el => {
        el.classList.remove('flash');
      });
    }, 1000);
  }

  compareMealPlans(oldPlan: WeeklyMealPlan, newPlan: WeeklyMealPlan): { day: string; meal: string }[] {
    const changes: { day: string; meal: string }[] = [];
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
    const mealTypes = ['breakfast', 'lunch', 'dinner'] as const;

    for (const day of days) {
      for (const mealType of mealTypes) {
        const oldMeal = oldPlan[day][mealType];
        const newMeal = newPlan[day][mealType];

        // Check if meal name has changed
        if (oldMeal.name !== newMeal.name) {
          changes.push({ day, meal: mealType });
          continue;
        }

        // Check if ingredients have changed
        if (oldMeal.ingredients.length !== newMeal.ingredients.length) {
          changes.push({ day, meal: mealType });
          continue;
        }

        for (let i = 0; i < oldMeal.ingredients.length; i++) {
          const oldIng = oldMeal.ingredients[i];
          const newIng = newMeal.ingredients[i];
          if (oldIng.name !== newIng.name || oldIng.amount !== newIng.amount || oldIng.unit !== newIng.unit) {
            changes.push({ day, meal: mealType });
            break;
          }
        }
      }
    }

    // Trigger flash animation for changed elements
    this.flashElements(changes);
    
    return changes;
  }
}
