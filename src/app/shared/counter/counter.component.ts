import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  public count = 0;

  @Input()
  public min;

  @Input()
  public max;

  @Output()
  public changeEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    if (this.min != null) {
      this.count = this.min;
    }
  }

  plusCount() {
    if (this.max != null && this.max === this.count) {
      return;
    }

    this.count++;
    this.changeEvent.emit(this.count);
  }

  minusCount() {
    if (this.min != null && this.min === this.count) {
      return;
    }

    this.count--;
    this.changeEvent.emit(this.count);
  }
}
