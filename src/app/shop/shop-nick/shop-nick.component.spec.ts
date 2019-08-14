import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNickComponent } from './shop-nick.component';

describe('ShopNickComponent', () => {
  let component: ShopNickComponent;
  let fixture: ComponentFixture<ShopNickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopNickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopNickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
