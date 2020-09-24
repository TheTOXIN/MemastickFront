import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

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
    this.navigate('/memetick/rating');
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

  memotypes() {
    this.navigate('/memotype/collection');
  }

  lab() {
    this.navigate('/lab');
  }

  chat() {
    this.navigate('/chat');
  }

  replicators() {
    alert('РЕПЛИКАТОРЫ В РАЗРАБОТКЕ');
  }

  navigate(url: string) {
    this.closeEvent.emit(null);
    this.router.navigateByUrl(url);
  }
}
