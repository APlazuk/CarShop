import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarComponent} from "./car/car.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, CarComponent, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'CarShop';
}
