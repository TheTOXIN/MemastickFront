import { Component, OnInit } from '@angular/core';
import {MemetickApiService} from '../../services/memetick-api-service';
import {Memetick} from '../../model/Memetick';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {MemetickAvatarApiService} from '../../services/memetick-avatar-api-service';

@Component({
  selector: 'app-memetick-rating',
  templateUrl: './memetick-rating.component.html',
  styleUrls: ['./memetick-rating.component.scss']
})
export class MemetickRatingComponent implements OnInit {

  public memetikcs: Memetick[] = [];

  constructor(
    public memetickApi: MemetickApiService,
    private avatrApi: MemetickAvatarApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.memetickApi.rating().subscribe(
      data => this.memetikcs = data
    );
  }

  getAvatar(memetick: Memetick) {
    return this.avatrApi.dowloadAvatar(memetick.id);
  }

  memetickView(memetickId: UUID) {
    this.router.navigate(['/home/memetick', memetickId]);
  }

}
