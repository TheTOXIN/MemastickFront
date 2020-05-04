import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonaterMessagesComponent } from './donater-messages.component';

describe('DonaterMessagesComponent', () => {
  let component: DonaterMessagesComponent;
  let fixture: ComponentFixture<DonaterMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonaterMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonaterMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
