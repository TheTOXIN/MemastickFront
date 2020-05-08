import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  animations: [
    trigger('bouncedState', [
      transition('* => *', [
        style({transform: 'scale(1)'}),
        animate(200, keyframes([
          style({transform: 'scale(1)', offset: 0}),
          style({transform: 'scale(1.3)', offset: 0.3}),
          style({transform: 'scale(1)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class CounterComponent implements OnInit {

  public count = 0;

  @Input()
  public min;

  @Input()
  public max;

  @Output()
  public changeEvent = new EventEmitter<number>();

  plusState = false;
  minusState = false;

  constructor() {
  }

  ngOnInit() {
    if (this.min != null) {
      this.count = this.min;
    }
  }

  plusCount() {
    this.plusState = !this.plusState;

    if (this.max != null && this.max === this.count) {
      return;
    }

    this.count++;
    this.changeEvent.emit(this.count);
  }

  minusCount() {
    this.minusState = !this.minusState;

    if (this.min != null && this.min === this.count) {
      return;
    }

    this.count--;
    this.changeEvent.emit(this.count);
  }
}
