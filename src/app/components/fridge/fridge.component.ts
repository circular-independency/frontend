import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';


export interface FridgeItemResponse {
  id: number;
  name_slo: string;
  grams: number;
  unit: string;
}

export interface FridgeItem {
  name: string;
  quantity: number;
}

@Component({
  selector: 'app-fridge',
  imports: [],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss'
})
export class FridgeComponent {
  apiService = inject(ApiService);

  fridgeItems = signal<any[]>([]);

  ngOnInit() {
    this.apiService.getFridgeItems().subscribe((data: FridgeItemResponse[]) => {
      console.log(data);
      this.fridgeItems.set(data.map((item) => ({
        name: item.name_slo,
        quantity: item.grams,
      })));
    });
  }
}
