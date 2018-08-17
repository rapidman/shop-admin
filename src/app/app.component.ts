import {Component} from '@angular/core';
import {fadeAnimation} from './animations/fade-in.animation';
import {BasketService} from "./shared/service/basket/basket.service";
import {MatDialog} from "@angular/material";

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'app';
  private basketService: BasketService;

  constructor(basketService: BasketService, public dialog: MatDialog) {
    this.basketService = basketService;
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  getBasketProductCount(): number {
    return this.basketService.getTotalOrderCount();
  }

}
