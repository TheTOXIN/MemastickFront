import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopMemotypesComponent } from './shop-memotypes.component';

describe('ShopMemotypesComponent', () => {
  let component: ShopMemotypesComponent;
  let fixture: ComponentFixture<ShopMemotypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopMemotypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopMemotypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
