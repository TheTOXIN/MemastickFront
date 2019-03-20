import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../shared/services/windows.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  public hide = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {

  }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number >= 69) {
      this.hide = true;
    } else {
      this.hide = false;
    }
  }
}
