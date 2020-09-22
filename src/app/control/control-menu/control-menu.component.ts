import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LogoutModalComponent} from '../../modals/logout-modal/logout-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreedModalComponent} from '../../modals/creed-modal/creed-modal.component';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss']
})
export class ControlMenuComponent implements OnInit {

  @Output()
  public closeEvent = new EventEmitter<any>();
  
  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  profile() {
    this.navigate('/memetick/me');
  }

  donaters() {
    this.navigate('/donaters/rating');
  }

  lab() {
    this.navigate('/lab');
  }

  settings() {
    this.navigate('/home/settings');
  }

  home() {
    this.navigate('/home');
  }

  chat() {
    this.navigate('/chat');
  }

  navigate(url: string) {
    this.closeEvent.emit(null);
    this.router.navigateByUrl(url);
  }
  
  exit() {
    this.modalService.open(LogoutModalComponent, {'centered': true});
  }

  creed() {
    const modalRef = this.modalService.open(CreedModalComponent, {'centered': true});
    modalRef.componentInstance.alreadyAgree = true;
  }
}
