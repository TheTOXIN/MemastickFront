import {Component, OnInit} from '@angular/core';
import {ControlService} from '../services/control-service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(
    private controlService: ControlService,
  ) {

  }

  ngOnInit() {
    this.controlService.hide();
  }
}
