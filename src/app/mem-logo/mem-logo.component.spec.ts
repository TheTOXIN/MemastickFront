import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemLogoComponent } from './mem-logo.component';

describe('MemLogoComponent', () => {
  let component: MemLogoComponent;
  let fixture: ComponentFixture<MemLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
