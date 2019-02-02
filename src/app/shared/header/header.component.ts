import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {WINDOW} from '../services/windows.service';
import {GlobalConst} from '../../consts/GlobalConst';
import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public headMessage = 'ВЕРСИЯ: ' + GlobalConst.VERSION;
  public darkHeader: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window,
    private router: Router
  ) {
  }

  ngOnInit() {
    $.getScript('./assets/js/script.js');
    $.getScript('./assets/js/tilt.jquery.js');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
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
