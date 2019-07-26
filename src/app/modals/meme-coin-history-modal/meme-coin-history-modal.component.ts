import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MemeCoinsApiService} from '../../api/meme-coins-api-service';
import {MemeCoin} from '../../model/MemeCoin';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-meme-coin-history-modal',
  templateUrl: './meme-coin-history-modal.component.html',
  styleUrls: ['./meme-coin-history-modal.component.scss']
})
export class MemeCoinHistoryModalComponent implements OnInit{

  public history: MemeCoin[] = [];

  page = 0;
  pageSize = 3;
  collectionSize = 0;

  constructor(
    public activeModal: NgbActiveModal,
    public coinsApi: MemeCoinsApiService
  ) {

  }

  ngOnInit(): void {
    this.coinsApi
      .history(this.page, this.pageSize, 'creating,desc')
      .subscribe(data => {
        this.history = data;
        this.collectionSize = data.length;
      });
  }
}
