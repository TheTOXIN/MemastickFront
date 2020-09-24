import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EpiModalComponent} from '../epi-modal/epi-modal.component';

@Component({
  selector: 'app-meme-create-modal',
  templateUrl: './meme-create-modal.component.html',
  styleUrls: ['./meme-create-modal.component.scss']
})
export class MemeCreateModalComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  showEpi() {
    this.modalService.open(EpiModalComponent, {'centered': true});
  }
}
