import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RankTokensModalComponent} from '../rank-tokens-modal/rank-tokens-modal.component';
import {RankTypesModalComponent} from '../rank-types-modal/rank-types-modal.component';

@Component({
  selector: 'app-dna-modal',
  templateUrl: './dna-modal.component.html',
  styleUrls: ['./dna-modal.component.scss']
})
export class DnaModalComponent implements OnInit {

  public data = [{
      text: 'За хромосомы',
      count: '0-100',
    }, {
      text: 'Использование токена',
      count: '100-500',
    }, {
      text: 'Создание мема',
      count: '500-1000',
    }, {
      text: 'Голосование в битвах',
      count: '10 x КОМБО',
    }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  showRankTypes() {
    this.modalService.open(RankTypesModalComponent, {'centered': true});
  }

  close() {
    this.activeModal.close('success');
  }
}
