import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPublishComponent } from './shop-publish.component';

describe('ShopPublishComponent', () => {
  let component: ShopPublishComponent;
  let fixture: ComponentFixture<ShopPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
