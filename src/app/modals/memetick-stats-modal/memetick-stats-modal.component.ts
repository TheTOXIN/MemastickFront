import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-memetick-stats-modal',
  templateUrl: './memetick-stats-modal.component.html',
  styleUrls: ['./memetick-stats-modal.component.scss']
})
export class MemetickStatsModalComponent implements OnInit {

  @Input()
  public memetickId: UUID;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
