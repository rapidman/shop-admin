import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWasSentInfoComponent } from './order-was-sent-info.component';

describe('OrderWasSentInfoComponent', () => {
  let component: OrderWasSentInfoComponent;
  let fixture: ComponentFixture<OrderWasSentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWasSentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWasSentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
