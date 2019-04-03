import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss']
})
export class ControlMenuComponent implements OnInit {

  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  profile() {
    this.router.navigateByUrl('/home/memetick/me');
  }

  settings() {
    this.router.navigateByUrl('/home/settings');
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  exit() {
    this.modalService.open(LogoutModalComponent, {'centered': true});
  }
}
