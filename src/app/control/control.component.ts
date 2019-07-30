import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../shared/services/windows.service';
import {MainApiService} from '../api/main-api-service';
import {NotifyCount} from '../model/NotifyCount';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  public hide = false;
  public close = false;

  public hideContentScope = true;
  public hideContentMenu = true;
  public hideContentEvents = true;
  public hideContentItems = true;

  private predYOffset = 0;

  public counter: NotifyCount;

  constructor(
    private mainApi: MainApiService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {

  }

  ngOnInit() {
    this.mainApi.notifyCount().subscribe(data => {
      this.counter = data;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset - this.predYOffset;
    this.hide = offset >= 0;
    this.predYOffset = this.window.pageYOffset;
  }

  hideAll() {
    this.ngOnInit();

    this.hideContentScope = true;
    this.hideContentMenu = true;
    this.hideContentEvents = true;
    this.hideContentItems = true;

    this.close = false;
  }
}
