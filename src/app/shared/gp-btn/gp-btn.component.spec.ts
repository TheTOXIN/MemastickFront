import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpBtnComponent } from './gp-btn.component';

describe('GpBtnComponent', () => {
  let component: GpBtnComponent;
  let fixture: ComponentFixture<GpBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
