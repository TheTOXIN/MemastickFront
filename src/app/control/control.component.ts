import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../shared/services/windows.service';
import {Home} from '../model/Home';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input()
  public home: Home;

  public hide = false;
  public close = false;

  public hideContentScope = true;
  public hideContentMenu = true;
  public hideContentEvents = true;
  public hideContentItems = true;

  private predYOffset = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset - this.predYOffset;
    this.hide = offset >= 0;
    this.predYOffset = this.window.pageYOffset;
  }

  hideAll() {
    this.hideContentScope = true;
    this.hideContentMenu = true;
    this.hideContentEvents = true;
    this.hideContentItems = true;

    this.close = false;
  }
}
