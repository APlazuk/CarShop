import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Car, CarControllerService} from "../../api/car/v1";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-delete-car',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './delete-car.component.html',
    styleUrl: './delete-car.component.css'
})
export class DeleteCarComponent implements OnInit {

    @Input() carDelete: Car = {};

    constructor(private carControllerService: CarControllerService,
                private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
    }

    openDelete(contentDeleteCar: TemplateRef<Car>) {
        this.modalService.open(contentDeleteCar, {
            backdrop: 'static',
            size: 'lg'
        });

        document.getElementById('delete-btn')!.addEventListener('click', (e) => {
            window.location.reload();
        })
    }

    deleteCarById() {
        let id: number = this.carDelete.id!;
        this.carControllerService.removeCar(id).subscribe((result) => {
            this.ngOnInit();
            this.modalService.dismissAll();
        })
    }
}
