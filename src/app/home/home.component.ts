import { Component, OnInit } from '@angular/core';
import {Memetick} from '../model/Memetick';
import {MemetickApiService} from '../services/memetick-api-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public memetick: Memetick = new Memetick(
    '',
    ''
  );

  constructor(
    private memetickApi: MemetickApiService
  ) {

  }

  ngOnInit() {
    this.takeMe();
  }

  private takeMe() {
    this.memetickApi.me().subscribe(data => {
      this.memetick = data;
    });
  }

}
