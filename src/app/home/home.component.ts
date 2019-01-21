import { Component, OnInit } from '@angular/core';
import {Memetick} from '../model/Memetick';
import {MemetickApiService} from '../services/memetick-api-service';
import {Router} from '@angular/router';

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
    private router: Router,
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

  memasiki() {
    this.router.navigateByUrl('/home/memes');
  }

}
