import { Component, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface ShoppingItemResponse {
  name_slo: string;
  grams_total: number;
  shop: string;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
}
@Component({
  selector: 'app-shopping-list',
  imports: [
    MatProgressSpinnerModule, 
    MatCheckboxModule, 
    MatIconModule, 
    TitleCasePipe,
    MatButtonModule,
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {

  constructor(private apiService: ApiService) {}

  shops = signal<string[]>([]);

  shoppingList = signal<Record<string, ShoppingItem[]>>({});
  shoppingListLoading = signal(false);

  ngOnInit() {  
    this.shoppingListLoading.set(true);
    this.apiService.getShoppingList().subscribe((result) => {
      const shoppingList: Record<string, ShoppingItem[]> = {};
      result.forEach((e: ShoppingItemResponse) => {
        console.log(e);
        const shoppingItem = {
          name: e.name_slo,
          quantity: e.grams_total,
        };
        if (!this.shops().includes(e.shop)) {
          this.shops.set([...this.shops(), e.shop]);
        }
        if (!shoppingList[e.shop]) {
          shoppingList[e.shop] = [];
        }
        shoppingList[e.shop].push(shoppingItem);
      });


      this.shoppingList.set(shoppingList);
      this.shoppingListLoading.set(false);
      console.log(this.shoppingList());
    });
  }

  shopBU(shop: string) {
    this.apiService.shopBU(shop).subscribe((result) => {
      console.log(result);
    });
  }

  shoppingDone(shop: string) {
    this.apiService.shoppingDone(shop).subscribe((result) => {
      console.log(result);
    });
  }
  
  
}
