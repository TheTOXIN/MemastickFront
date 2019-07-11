import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dna-modal',
  templateUrl: './dna-modal.component.html',
  styleUrls: ['./dna-modal.component.scss']
})
export class DnaModalComponent implements OnInit {

  public data = [{
      text: 'Создание мема',
      count: '100-1000',
    },{
      text: 'Использование токена',
      count: 'asdasd',
    },{
      text: 'За хромосомы',
      count: '1-10',
    }
  ];

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }
}
