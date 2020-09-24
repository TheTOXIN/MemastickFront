import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {WINDOW} from '../services/windows.service';
import {Router} from '@angular/router';
import {VERSION} from '../../app.constants';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headMessage = 'ver: ' + VERSION;
  public darkHeader: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window,
    private router: Router
  ) {
  }

  ngOnInit() {

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number >= 60) {
      this.darkHeader = true;
    } else {
      this.darkHeader = false;
    }
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }
}
