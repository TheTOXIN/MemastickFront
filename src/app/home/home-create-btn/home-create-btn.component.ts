import {Component, HostListener, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '../../shared/services/windows.service';
import {GlobalConst} from '../../consts/GlobalConst';

@Component({
  selector: 'app-home-create-btn',
  templateUrl: './home-create-btn.component.html',
  styleUrls: ['./home-create-btn.component.scss']
})
export class HomeCreateBtnComponent implements OnInit {

  @Input()
  public state: number = 0;

  private predYOffset = 0;

  hide = false;
  ready = false;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window
  ) {

  }

  ngOnInit() {
    this.state = 50;
    this.ready = this.state === GlobalConst.CELL_SATE;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset - this.predYOffset;
    this.hide = offset >= 0;
    this.predYOffset = this.window.pageYOffset;
  }

  toCreate() {
    this.router.navigateByUrl('/memes/create');
  }
}
