import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Car, CarControllerService} from "../api/car/v1";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit{

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
