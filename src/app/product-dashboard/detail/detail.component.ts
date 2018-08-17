import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {DetailService, Product} from "../../shared/service/detail/detail.service";
import {BasketService} from "../../shared/service/basket/basket.service";
import {BasketDialogComponent} from "../../shared/basket-dialog/basket-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  detail: Product;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private detailService: DetailService,
              private basketService: BasketService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    // alert('DetailComponent');
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.detailService.findGoodsById(id).subscribe(data => {
          this.detail = data;
          this.detailService.addRate(id);
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  addToBasket() {
    this.basketService.addToBasket(this.detail.id);
  }


  inBasket(): boolean {
    return this.basketService.getCount(this.detail.id) > 0;
  }

  openBasket(): void {
    const dialogRef = this.dialog.open(BasketDialogComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createStarRange(){
    var items: number[] = [];
    for(var i = 1; i <= this.detail.rate; i++){
      items.push(i);
    }
    return items;
  }

  createGreyStarRange(){
    var items: number[] = [];
    for(var i = 1; i <= 5 - this.detail.rate; i++){
      items.push(i);
    }
    return items;
  }
}
