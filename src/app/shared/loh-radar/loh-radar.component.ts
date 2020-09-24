import {Component, Input, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {MemeLoh} from '../../model/meme/MemeLoh';
import {ScreenUtils} from '../../utils/screen-utils';
import {UUID} from 'angular2-uuid';
import {MemeLohApiService} from '../../api/meme-loh-api-service';

@Component({
  selector: 'app-loh-radar',
  templateUrl: './loh-radar.component.html',
  styleUrls: ['./loh-radar.component.scss']
})
export class LohRadarComponent implements OnInit {

  @Input()
  public memeId: UUID;

  @Input()
  public loh: MemeLoh;

  public radarChartOptions: ChartOptions;
  public radarChartColors: Color[];
  public radarChartLabels: Label[] = ['LoL😆', 'OMG😯', 'Hmm🤔'];
  public radarChartData: ChartDataSets[] = [{data: [0, 0, 0]}];
  public radarChartType: ChartType = 'radar';

  isLoad = false;

  constructor(
    private memeLohApi: MemeLohApiService
  ) {

  }

  ngOnInit() {
    this.initLoh();
    this.initChart();
  }

  public updateData(loh: MemeLoh) {
    this.initData(new MemeLoh(
      loh.lol + this.loh.lol,
      loh.omg + this.loh.omg,
      loh.hmm + this.loh.hmm
    ));
  }

  private initLoh() {
    if (this.memeId != null) {
      this.memeLohApi.read(this.memeId).subscribe(data => {
        this.loh = data;

        this.initData(this.loh);
        this.isLoad = true;
      });
    } else {
      if (this.loh == null) {
        this.loh = new MemeLoh(0, 0, 0);
      }

      this.initData(this.loh);
      this.isLoad = true;
    }
  }

  private initData(loh: MemeLoh) {
    const sum = loh.lol + loh.omg + loh.hmm;

    this.radarChartData = [{
      data: [
        Math.round(loh.lol / sum * 100),
        Math.round(loh.omg / sum * 100),
        Math.round(loh.hmm / sum * 100)
      ]
    }];
  }

  private initChart() {
    const isMob = ScreenUtils.isMobileScreen();

    this.radarChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      elements: {
        line: {
          borderWidth: 5
        },
        point: {
          radius: isMob ? 7 : 10,
          borderWidth: 3,
          hoverRadius: 5,
        }
      },
      scale: {
        pointLabels: {
          fontSize: isMob ? 18 : 24,
          fontColor: '#000',
          fontFamily: 'Gost'
        },
        angleLines: {
          display: true
        },
        ticks: {
          display: true,
          maxTicksLimit: 1,
          suggestedMin: 0,
          suggestedMax: 100,
          showLabelBackdrop: false,
          fontSize: 0
        },
        gridLines: {
          circular: false,
          display: true,
          color: '#6b25fc',
          lineWidth: 5
        }
      },
    };

    this.radarChartColors = [{
      backgroundColor: 'rgba(255,168,7,0.5)',
      borderColor: '#9647db',
      pointBackgroundColor: '#ffa807',
      pointBorderColor: '#fff'
    }];
  }
}
