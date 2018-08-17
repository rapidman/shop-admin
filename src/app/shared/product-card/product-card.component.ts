import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../service/basket/basket.service";
import {MatDialog} from "@angular/material";
import {BasketDialogComponent} from "../basket-dialog/basket-dialog.component";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  private basketService: BasketService;

  constructor(basketService: BasketService, public dialog: MatDialog) {
    this.basketService = basketService;
  }

  openBasket(): void {
    const dialogRef = this.dialog.open(BasketDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

  addToBasket() {
    this.basketService.addToBasket(this.product.productId);
  }


  inBasket(): boolean {
    return this.basketService.getCount(this.product.productId) > 0;
  }
}
