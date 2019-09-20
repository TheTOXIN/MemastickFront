import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
