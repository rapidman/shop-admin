import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BasketService, Order} from "../service/basket/basket.service";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.css']
})
export class BasketDialogComponent implements OnInit {
  private totalPrice: number;

  constructor(
    public dialogRef: MatDialogRef<BasketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private basketService: BasketService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getOrders(): Order[] {
    return this.basketService.getOrders();
  }

  ngOnInit() {
  }

  deleteProduct(item: Order) {
    this.basketService.delete(item.productId);
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (const order of this.getOrders()) {
      this.totalPrice += order.price;
    }
    return this.totalPrice;
  }
}
