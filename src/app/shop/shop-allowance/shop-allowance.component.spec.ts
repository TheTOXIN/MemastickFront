import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAllowanceComponent } from './shop-allowance.component';

describe('ShopAllowanceComponent', () => {
  let component: ShopAllowanceComponent;
  let fixture: ComponentFixture<ShopAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
