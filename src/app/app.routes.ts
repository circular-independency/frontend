import { Routes } from '@angular/router';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { MenuComponent } from './components/menu/menu.component';


export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'fridge', component: FridgeComponent }
];
