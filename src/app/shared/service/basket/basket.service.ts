import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

export interface Basket {
  orders: Order[];
}

export interface Order {
  productId: number;
  categoryId: number;
  count: number;
  goodsName: string;
  goodsDescription: string;
  price: number;
}

export interface UserOrder {
  orders: Order[];
  email: string;
  phone: string;
  name: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public API = '//mighty-reef-79555.herokuapp.com/api/v1';
  public BASKET_API = this.API + '/basket';

  private basket: Basket;

  constructor(private http: HttpClient) {
    this.basket = {orders: []};
    this.refreshBasket();
  }

  addToBasket(productId: any) {
    this.http.put(this.BASKET_API, {"productId": productId, "count": 1},
      {withCredentials: true})
      .subscribe(data => {
        this.refreshBasket();
      });
  }

  refreshBasket() {
    return this.http.get<Basket>(this.BASKET_API, {withCredentials: true}).subscribe(data => {
      this.basket.orders = _.values(data['orders']);
    });
  }

  getCount(productId: number): number {
    for (const order of this.basket.orders) {
      if (order.productId === productId) {
        return order.count;
      }
    }
    return 0;
  }

  getTotalOrderCount(): number {
    if (this.basket.orders) {
      return this.basket.orders.length;
    }

    return 0;
  }

  getOrders(): Order[] {
    return this.basket.orders;
  }

  delete(productId: number) {
    this.http.delete(this.BASKET_API + '/' + productId,
      {withCredentials: true})
      .subscribe(data => {
        this.refreshBasket();
      });
  }

  sendOrder(userOrder: UserOrder) {
    this.http.post(this.BASKET_API + '/order',
      userOrder,
      {withCredentials: true})
      .subscribe(data => {
        this.refreshBasket();
      });
  }
}
