import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../shared/services/windows.service';
import {MainApiService} from '../api/main-api-service';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {NotifyCounterService} from '../services/notify-counter.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  animations: [
    trigger('counterState', [
      transition('* => *', [
        animate(300, keyframes([
          style({ transform: 'scale(1)'}),
          style({ transform: 'scale(1.3)'}),
          style({ transform: 'scale(1)'})
        ]))
      ])
    ])
  ]
})
export class ControlComponent implements OnInit {

  public hideContentScope = true;
  public hideContentMenu = true;
  public hideContentBells = true;
  public hideContentItems = true;

  public countItems: number = 0;
  public countBells: number = 0;

  public showCountItems = false;
  public showCountBells = false;

  public close = false;

  constructor(
    private counterService: NotifyCounterService
  ) {

  }

  ngOnInit() {
    this.counterService.subscribeItemCounter().subscribe((counter) => {
      if (counter !== 0) {
        if (this.countItems === 0) {
          this.countItems = counter;
          this.showCountItems = this.countItems !== 0;
        } else {
          this.countItems += counter;
          this.showCountItems = true;
        }
      }
    });

    this.counterService.subscribeBellCounter().subscribe((counter) => {
      if (counter !== 0) {
        if (this.countBells === 0) {
          this.countBells = counter;
          this.showCountBells = this.countBells !== 0;
        } else {
          this.countBells += counter;
          this.showCountBells = true;
        }
      }
    });
  }

  hideAll() {
    this.updateCounter();

    this.hideContentScope = true;
    this.hideContentMenu = true;
    this.hideContentBells = true;
    this.hideContentItems = true;

    this.close = false;
  }

  updateCounter() {
    if (!this.hideContentItems) {
      this.showCountItems = false;
    }

    if (!this.hideContentBells) {
      this.showCountBells = false;
    }
  }
}
