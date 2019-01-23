import { Component, OnInit } from '@angular/core';
import {Memetick} from '../model/Memetick';
import {MemetickApiService} from '../services/memetick-api-service';
import {Router} from '@angular/router';
import {MemFireService} from '../services/mem-fire-service';

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
    private memFire: MemFireService,
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

  memes() {
    this.router.navigateByUrl('/home/memes');
  }

  memeCreator() {
    this.router.navigateByUrl('/home/memes/create');
  }

  memetickMe() {
    this.router.navigateByUrl('/home/memetick/me');
  }

}
