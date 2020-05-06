import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUpdateComponent } from './preview-update.component';

describe('PreviewUpdateComponent', () => {
  let component: PreviewUpdateComponent;
  let fixture: ComponentFixture<PreviewUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
