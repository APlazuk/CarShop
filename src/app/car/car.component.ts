import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Car, CarControllerService} from "../api/car/v1";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {DetailsCarComponent} from "./details-car/details-car.component";

@Component({
    selector: 'app-car',
    standalone: true,
    imports: [CommonModule, RouterOutlet, DetailsCarComponent, RouterLink, RouterLinkActive],
    templateUrl: './car.component.html',
    styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  cars: Array<Car> | undefined =[]

  constructor(private carControllerService: CarControllerService) {
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  private getAllCars(): void{
    this.carControllerService.getAllCars()
      .subscribe(response =>
      this.cars = response.content)
  }

}
