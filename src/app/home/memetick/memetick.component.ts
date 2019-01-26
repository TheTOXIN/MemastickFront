import { Component, OnInit } from '@angular/core';
import {MemetickApiService} from '../../services/memetick-api-service';
import {Memetick} from '../../model/Memetick';

@Component({
  selector: 'app-memetick',
  templateUrl: './memetick.component.html',
  styleUrls: ['./memetick.component.scss']
})
export class MemetickComponent implements OnInit {

  public avatarURL: String = 'dasdasdasdasd';

  public memetick: Memetick = new Memetick(
    'asdasdasdasd',
    'SUKA BLYAT'
  );

  constructor(
    private memetickApi: MemetickApiService,
  ) {

  }

  ngOnInit() {
    this.memetickApi.me().subscribe(data => {
      this.memetick = data;
    });
  }

}
