import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeFilter} from '../../consts/MemeFilter';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-control-scope',
  templateUrl: './control-scope.component.html',
  styleUrls: ['./control-scope.component.scss']
})
export class ControlScopeComponent implements OnInit {

  @Output()
  public closeEvent = new EventEmitter<any>();

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  evolution() {
    this.navigate('/memes');
  }

  creating() {
    this.navigate('/memes/create');
  }

  rating() {
    this.navigate('/home/memetick/rating');
  }

  library() {
    this.navigate('/home/library');
  }

  shop() {
    this.navigate('/shop');
  }

  mining() {
    this.navigate('/home/mining');
  }

  battle() {
    this.navigate('/battle');
  }

  laboratory() {
    this.navigate('/lab');
  }

  memotypes() {
    this.navigate('/memotype/collection');
  }

  navigate(url: string) {
    this.closeEvent.emit(null);
    this.router.navigateByUrl(url);
  }
}
