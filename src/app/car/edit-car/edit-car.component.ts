import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Car, CarControllerService} from "../../api/car/v1";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as jsonpatch from 'fast-json-patch';
import {Observer} from 'fast-json-patch';

@Component({
    selector: 'app-edit-car',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './edit-car.component.html',
    styleUrl: './edit-car.component.css'
})
export class EditCarComponent implements OnInit {

    @Input() carEdit: Car = {};

    editForm = new FormGroup({
        id: new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(1)]),
        mark: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
    })

    constructor(private carControllerService: CarControllerService,
                private modalService: NgbModal
    ) {
    }

    ngOnInit(): void {
    }

    get editFormControl() {
        return this.editForm.controls;
    }

    editCar(): void {

        this.editForm.get('id')?.enable();
        let car = Object.assign(this.editForm.value);

        this.carControllerService.modCar(car)
            .subscribe((result) => {
                this.ngOnInit();
            })

        this.editForm.reset();
        console.log(this.carEdit);
        console.log(car);

        this.modalService.dismissAll();

    }

    editCarById(): void {
        const car: Car = this.carEdit;
        let observer: Observer<Car> = jsonpatch.observe(car);
        car.mark = this.editForm.get('mark')?.value!;
        car.color = this.editForm.get('color')?.value!;
        let modCar = jsonpatch.generate(observer);
        console.log(modCar);

        let carId: number = Number(this.editForm.get('id')?.value!);
        this.carControllerService.modCarById(carId, modCar).subscribe((result) => {
            this.ngOnInit();
        })

        this.editForm.reset();
        console.log(carId);

        this.modalService.dismissAll();
    }

    openEdit(contentEditCar: TemplateRef<Car>) {
        console.log("Car id: ", this.carEdit.id);
        this.modalService.open(contentEditCar, {
            centered: true,
            backdrop: 'static',
            size: 'lg',
        });

        document.getElementById("id")!.setAttribute('value', String(this.carEdit.id));
        document.getElementById('save-btn')!.addEventListener('click', (e) => {
            window.location.reload();
        });

        this.editForm.patchValue({
            id: String(this.carEdit.id),
            mark: this.carEdit.mark,
            color: this.carEdit.color
        });
    }
}
