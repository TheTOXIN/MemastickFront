import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeFilter} from '../../consts/MemeFilter';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';

@Component({
  selector: 'app-control-scope',
  templateUrl: './control-scope.component.html',
  styleUrls: ['./control-scope.component.scss']
})
export class ControlScopeComponent implements OnInit {

  constructor(
    private router: Router,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  evolution() {
    this.router.navigate(['/memes'], {queryParams: {filter: MemeFilter.EVLV}});
  }

  creating() {
    this.router.navigateByUrl('/memes/create');
  }

  rating() {
    this.router.navigateByUrl('/home/memetick/rating');
  }

  library() {
    this.router.navigateByUrl('/home/library');
  }

  shop() {
    this.dipricated();
  }

  battle() {
    this.dipricated();
  }

  dipricated() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.content = 'ФУНКЦИЯ БУДЕТ ДОСТУПНА В 0.4 alpha';
    modalRef.componentInstance.title = 'ОЙ :(';
  }
}
