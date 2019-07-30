import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-epi-modal',
  templateUrl: './epi-modal.component.html',
  styleUrls: ['./epi-modal.component.scss']
})
export class EpiModalComponent implements OnInit {

  public data = [{
    liter: 'Э',
    word: 'эволюция',
    text: 'Номер дня эволюции в который был создан мем, мемы одной эволюции учавствуют в отборе',
    color: '#6b25fc'
  },{
    liter: 'П',
    word: 'популяция',
    text: 'Номер часа в дне в который был создан мем, мемы одной популяции переходят на следующий этап вместе',
    color: '#8136EC'
  },{
    liter: 'И',
    word: 'индекс',
    text: 'Номер мема среди популяции в которой он был создан, чем больше индекс тем выше мем в списке своей популяции',
    color: '#9647db'
  }];

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
