import { Routes } from '@angular/router';
import {CarComponent} from "./car/car.component";
import {AddCarComponent} from "./car/add-car/add-car.component";

export const routes: Routes = [
  {path: '', component: CarComponent},
  {path: 'add', component: AddCarComponent},
  ];
