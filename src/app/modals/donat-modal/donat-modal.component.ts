import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-donat-modal',
  templateUrl: './donat-modal.component.html',
  styleUrls: ['./donat-modal.component.scss']
})
export class DonatModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit(): void {

  }
}
