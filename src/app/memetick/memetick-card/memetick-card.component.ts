import { Component, OnInit } from '@angular/core';
import {UUID} from 'angular2-uuid';
import {MemetickApiService} from '../../api/memetick-api-service';
import {Memetick} from '../../model/Memetick';

@Component({
  selector: 'app-memetick-card',
  templateUrl: './memetick-card.component.html',
  styleUrls: ['./memetick-card.component.scss']
})
export class MemetickCardComponent implements OnInit {

  public memetick: Memetick;

  isShow = false;
  isLoad = false;

  constructor(
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {

  }

  public showCard(memetickId: UUID) {
    this.isLoad = false;

    this.memetickApi.view(memetickId).subscribe(data => {
      this.memetick = data;
      this.isLoad = true;
    });

    this.isShow = true;
  }

  public cardClose() {
    this.memetick = null;
    this.isShow = false;
  }
}