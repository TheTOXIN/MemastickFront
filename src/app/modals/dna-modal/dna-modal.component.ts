import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dna-modal',
  templateUrl: './dna-modal.component.html',
  styleUrls: ['./dna-modal.component.scss']
})
export class DnaModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
