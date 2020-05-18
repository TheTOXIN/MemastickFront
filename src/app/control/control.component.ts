import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../shared/services/windows.service';
import {MainApiService} from '../api/main-api-service';
import {NotifyCount} from '../model/NotifyCount';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {BellCounterService} from '../services/bell-counter-service';

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

  public hide = false;
  public close = false;

  public hideContentScope = true;
  public hideContentMenu = true;
  public hideContentBells = true;
  public hideContentItems = true;

  private predYOffset = 0;

  public counter: NotifyCount;

  public showCountBells = false;
  public showCountItems = false;

  constructor(
    private counterService: BellCounterService,
    private mainApi: MainApiService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {

  }

  ngOnInit() {
    this.mainApi.notifyCount().subscribe(data => {
      this.counter = data;
      this.showCountBells = this.counter.countBells !== 0;
      this.showCountItems = this.counter.countItems !== 0;
    });

    this.counterService.subscribeCounter().subscribe((counter) => {
      if (counter) {
        this.counter.countBells++;
        this.showCountBells = true;
        this.hide = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset - this.predYOffset;
    this.hide = offset >= 0;
    this.predYOffset = this.window.pageYOffset;
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
