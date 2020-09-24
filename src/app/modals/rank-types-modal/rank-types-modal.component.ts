import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RankApiService} from '../../api/rank-api-service';
import {RankType} from '../../model/rank/RankType';

@Component({
  selector: 'app-rank-types-modal',
  templateUrl: './rank-types-modal.component.html',
  styleUrls: ['./rank-types-modal.component.scss']
})
export class RankTypesModalComponent implements OnInit {

  public isLoad = true;
  public data: RankType[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private rankAPI: RankApiService
  ) {

  }

  ngOnInit() {
    this.rankAPI.getRankTypes().subscribe(data => {
      this.isLoad = false;
      this.data = data;
    });
  }
}
