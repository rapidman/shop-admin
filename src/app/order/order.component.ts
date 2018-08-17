import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MatSnackBar} from "@angular/material";
import {OrderWasSentInfoComponent} from "../shared/order-was-sent-info/order-was-sent-info.component";
import {Router} from "@angular/router";
import {BasketService, Order, UserOrder} from "../shared/service/basket/basket.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('\\+\\d{10,15}'),
  ]);
  nameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();
  email: string;
  phone: string;
  name: string;
  lastName: string;

  constructor(public snackBar: MatSnackBar,
              private router: Router,
              private basketService: BasketService) {
  }

  ngOnInit() {
    this.email = "";
  }

  getEmail(): string {
    return this.email;
  }

  send() {
    this.emailFormControl.markAsTouched({onlySelf: true});
    this.phoneFormControl.markAsTouched({onlySelf: true});
    this.nameFormControl.markAsTouched({onlySelf: true});
    this.lastNameFormControl.markAsTouched({onlySelf: true});
    let ok = true;
    if (!this.checkEmail() || !this.checkPhone() || !this.checkName() || !this.checkLastName()) {
      ok = false;
    }
    if (ok) {
      alert(this.email + this.phone);
      let userOrder : UserOrder = {
        orders: this.basketService.getOrders(),
        email: this.email,
        phone: this.phone,
        name: this.phone,
        lastName: this.lastName
      };
      this.basketService.sendOrder(userOrder);
      this.openSnackBar();
      this.router.navigate(['/main']);
    }
  }

  public checkLastName() {
    return !this.lastNameFormControl.hasError('required');
  }

  public checkName() {
    return !this.nameFormControl.hasError('required');
  }

  public checkPhone() {
    return !this.phoneFormControl.hasError('pattern') && !this.phoneFormControl.hasError('required');
  }

  public checkEmail() {
    return !this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required');
  }

  onEmailKey($event: any) {
    this.email = $event.target.value;
  }

  onPhoneKey($event: any) {
    this.phone = $event.target.value;
  }

  onNameKey($event: any) {
    this.name = $event.target.value;
  }

  onLastNameKey($event: any) {
    this.lastName = $event.target.value;
  }

  openSnackBar() {
    this.snackBar.openFromComponent(OrderWasSentInfoComponent, {
      duration: 2000,
    });
  }
}

