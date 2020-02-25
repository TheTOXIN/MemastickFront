import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-laboratory-info-modal',
  templateUrl: './laboratory-info-modal.component.html',
  styleUrls: ['./laboratory-info-modal.component.scss']
})
export class LaboratoryInfoModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
