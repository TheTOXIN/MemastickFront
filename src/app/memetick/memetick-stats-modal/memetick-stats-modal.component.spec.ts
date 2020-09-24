import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemetickStatsModalComponent} from './memetick-stats-modal.component';

describe('MemetickStatsModalComponent', () => {
  let component: MemetickStatsModalComponent;
  let fixture: ComponentFixture<MemetickStatsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemetickStatsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemetickStatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
