import {Component, Input, OnInit} from '@angular/core';
import {StatisticApiService} from '../../api/statistic-api-service';
import {Statistic} from '../../model/Statistic';
import {UUID} from 'angular2-uuid';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  @Input()
  public memetickId: UUID;

  public stats: Statistic = new Statistic(
    0, 0, 0
  );

  constructor(
    private statisticApi: StatisticApiService
  ) {

  }

  ngOnInit() {
    if (this.memetickId != null) {
      this.statisticApi.memetick(this.memetickId).subscribe(data =>  {
        this.stats = data;
      });
    } else {
      this.statisticApi.global().subscribe(data => {
        this.stats = data;
      });
    }
  }
}
