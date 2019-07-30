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
export class MemeCoinHistoryModalComponent implements OnInit {

  public history: MemeCoin[] = [];
  public collectionSize = 21;

  pageCurrent = 0;
  pageSize = 3;

  isLoad = true;

  constructor(
    public activeModal: NgbActiveModal,
    public coinsApi: MemeCoinsApiService
  ) {

  }

  ngOnInit(): void {

  }

  public getHistory () {
    this.isLoad = true;

    this.coinsApi
      .history(this.pageCurrent - 1, this.pageSize, 'creating,desc')
      .subscribe(data => {
        this.history = data.content;
        this.collectionSize = data.totalElements;
        this.isLoad = false;
      });
  }
}
