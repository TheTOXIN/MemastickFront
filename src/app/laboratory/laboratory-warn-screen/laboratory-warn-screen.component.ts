import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-laboratory-warn-screen',
  templateUrl: './laboratory-warn-screen.component.html',
  styleUrls: ['./laboratory-warn-screen.component.scss']
})
export class LaboratoryWarnScreenComponent implements OnInit {

  public show = false;

  constructor() { }

  ngOnInit() {
    this.show = window.innerWidth < 1200;
  }

  back() {
    window.history.back();
  }

  close() {
    this.show = false;
  }
}
