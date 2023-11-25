import {Component, Input, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Car} from "../../api/car/v1";

@Component({
    selector: 'app-details-car',
    standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
    templateUrl: './details-car.component.html',
    styleUrl: './details-car.component.css'
})
export class DetailsCarComponent {

  @Input() car: Car = {};

  private modalService: NgbModal = new NgbModal();

  openDetails(contentDetails: TemplateRef<any>) {
    console.log("Car id: " + this.car)
    this.modalService.open(contentDetails, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    document.getElementById('carId')!.setAttribute('value', String(this.car.id));
    document.getElementById('carMark')!.setAttribute('value', String(this.car.mark));
    document.getElementById('carColor')!.setAttribute('value', String(this.car.color));
  }
}
