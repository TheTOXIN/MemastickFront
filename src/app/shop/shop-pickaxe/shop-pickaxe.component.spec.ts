import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPickaxeComponent } from './shop-pickaxe.component';

describe('ShopPickaxeComponent', () => {
  let component: ShopPickaxeComponent;
  let fixture: ComponentFixture<ShopPickaxeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPickaxeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPickaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
