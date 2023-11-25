import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {Car, CarControllerService} from "../../api/car/v1";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {

   carFrom: FormGroup = new FormGroup({
        id: new FormControl(1, [Validators.required, Validators.min(1)]),
        mark: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
    })

    private car: Car = {};

    constructor(private carControllerService: CarControllerService) {
    }

    ngOnInit(): void {
    }

    createCar(): Car {
        this.car = Object.assign(this.carFrom.value);
        return this.car;
    }

    addCar(): void {
        let car = this.createCar();
        console.log(car);
        this.carControllerService.addCar(car)
            .subscribe((result) => {
                this.ngOnInit();
            });
        this.carFrom.reset();
    }
}
