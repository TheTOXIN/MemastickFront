import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-memotype-rarity-modal',
  templateUrl: './memotype-rarity-modal.component.html',
  styleUrls: ['./memotype-rarity-modal.component.scss']
})
export class MemotypeRarityModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
