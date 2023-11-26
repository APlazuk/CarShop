import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Car, CarControllerService} from "../api/car/v1";
import {DetailsCarComponent} from "./details-car/details-car.component";
import {EditCarComponent} from "./edit-car/edit-car.component";

@Component({
    selector: 'app-car',
    standalone: true,
    imports: [CommonModule, DetailsCarComponent, EditCarComponent],
    templateUrl: './car.component.html',
    styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

    cars: Array<Car> | undefined = []

    constructor(private carControllerService: CarControllerService) {
    }

    ngOnInit(): void {
        this.getAllCars();
    }

    public getAllCars(): void {
        this.carControllerService.getAllCars()
            .subscribe(response =>
                this.cars = response.content)
    }

}
