import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RankToken} from '../../model/rank/RankToken';
import {RankApiService} from '../../api/rank-api-service';

@Component({
  selector: 'app-rank-tokens-modal',
  templateUrl: './rank-tokens-modal.component.html',
  styleUrls: ['./rank-tokens-modal.component.scss']
})
export class RankTokensModalComponent implements OnInit {

  public isLoad = true;
  public data: RankToken[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private rankAPI: RankApiService
  ) {

  }

  ngOnInit() {
    this.rankAPI.getRankTokens().subscribe(data => {
      this.isLoad = false;
      this.data = data;
    });
  }
}
