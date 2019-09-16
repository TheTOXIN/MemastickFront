import { Component, OnInit } from '@angular/core';
import {MemetickApiService} from '../../api/memetick-api-service';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {MemetickRatingFilter} from '../../consts/MemetickRatingFilter';
import {MemetickRating} from '../../model/MemetickRating';
import {MemetickPreview} from '../../model/MemetickPreview';
import {MemetickRatingData} from '../../model/MemetickRatingData';

@Component({
  selector: 'app-memetick-rating',
  templateUrl: './memetick-rating.component.html',
  styleUrls: ['./memetick-rating.component.scss']
})
export class MemetickRatingComponent implements OnInit {

  isLoad = true;
  isPanel = true;

  public icons = [];

  public filter = MemetickRatingFilter.DNA;
  public rating: MemetickRating;

  public ratingAvatars = [];
  public myAvatar: string;

  constructor(
    public memetickApi: MemetickApiService,
    private avatrApi: MemetickAvatarApiService,
    private router: Router
  ) {
    this.icons[MemetickRatingFilter.DNA] = 'assets/images/icon/3.png';
    this.icons[MemetickRatingFilter.IND] = 'assets/images/icon/1.png';
    this.icons[MemetickRatingFilter.CHR] = 'assets/images/icon/2.png';
  }

  ngOnInit() {
    this.memetickApi.rating(this.filter).subscribe(data => {
      this.rating = data;

      for (const mr of this.rating.top) {
        this.ratingAvatars[mr.preview.id + ''] = this.getAvatar(mr.preview);
      }
      this.myAvatar = this.getAvatar(this.rating.me.preview);

      this.isLoad = false;
    });
  }

  reload(filter: MemetickRatingFilter) {
    this.isLoad = true;
    this.filter = filter;
    this.ngOnInit();
  }

  ratingDNA() {
    this.reload(MemetickRatingFilter.DNA);
  }

  ratingIND() {
    this.reload(MemetickRatingFilter.IND);
  }

  ratingCHR() {
    this.reload(MemetickRatingFilter.CHR);
  }

  getAvatar(memetick: MemetickPreview) {
    return this.avatrApi.dowloadAvatar(memetick.id);
  }

  memetickView(memetickId: UUID) {
    this.router.navigate(['/home/memetick', memetickId]);
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }
}
