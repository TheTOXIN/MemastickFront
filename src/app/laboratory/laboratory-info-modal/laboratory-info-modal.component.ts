import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {VK_GROUP} from '../../app.constants';

@Component({
  selector: 'app-laboratory-info-modal',
  templateUrl: './laboratory-info-modal.component.html',
  styleUrls: ['./laboratory-info-modal.component.scss']
})
export class LaboratoryInfoModalComponent implements OnInit {

  public vkLink = VK_GROUP;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
