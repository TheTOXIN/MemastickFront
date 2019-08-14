import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopResurrectionComponent } from './shop-resurrection.component';

describe('ShopResurrectionComponent', () => {
  let component: ShopResurrectionComponent;
  let fixture: ComponentFixture<ShopResurrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopResurrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopResurrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
