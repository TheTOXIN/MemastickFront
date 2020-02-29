import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {memotypeColors} from '../../consts/MemotypeData';

@Component({
  selector: 'app-rank-info-modal',
  templateUrl: './rank-info-modal.component.html',
  styleUrls: ['./rank-info-modal.component.scss']
})
export class RankInfoModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }
}
