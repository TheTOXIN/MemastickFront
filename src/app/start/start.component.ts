import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    public app: AppComponent
  ) {

  }

  ngOnInit() {
    this.app.control(false);
  }
}
