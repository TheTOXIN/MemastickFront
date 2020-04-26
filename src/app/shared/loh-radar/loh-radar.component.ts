import {Component, OnInit} from '@angular/core';
import {ChartColor, ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-loh-radar',
  templateUrl: './loh-radar.component.html',
  styleUrls: ['./loh-radar.component.scss']
})
export class LohRadarComponent implements OnInit {

  public radarChartOptions: ChartOptions;
  public radarChartData: ChartDataSets[] = [{data: [40, 30, 60]}];
  public radarChartColors: Color[];
  public radarChartLabels: Label[] = ['LoL', 'OMG', 'Hmm'];
  public radarChartType: ChartType = 'radar';

  constructor() {
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
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
          radius: 10,
          borderWidth: 3,
          hoverRadius: 5,
        }
      },
      scale: {
        pointLabels: {
          fontSize: 32,
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
          fontSize: 0,
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
