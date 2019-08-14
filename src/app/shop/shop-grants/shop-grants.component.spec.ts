import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGrantsComponent } from './shop-grants.component';

describe('ShopGrantsComponent', () => {
  let component: ShopGrantsComponent;
  let fixture: ComponentFixture<ShopGrantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopGrantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
