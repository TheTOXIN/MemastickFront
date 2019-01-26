import {Component, Input, OnInit} from '@angular/core';
import {StatisticApiService} from '../../services/statistic-api-service';
import {Statistic} from '../../model/Statistic';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  @Input()
  public memetickId: UUID;
  public stats: Statistic;
  public isLoading = false;

  constructor(
    private statisticApi: StatisticApiService
  ) {

  }

  ngOnInit() {
    if (this.memetickId != null) {
      this.stats = this.statisticApi.memetick(this.memetickId);
    } else {
      this.stats = this.statisticApi.global();
    }

    this.isLoading = true;
  }

}
