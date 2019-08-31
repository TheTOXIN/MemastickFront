import { Component, OnInit } from '@angular/core';
import {BattleRating} from '../../model/battle/BattleRating';
import {BattleApiService} from '../../api/battle-api-service';
import {BattleConst} from '../../consts/BattleConst';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {MemetickPreview} from '../../model/MemetickPreview';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';

@Component({
  selector: 'app-battle-rating',
  templateUrl: './battle-rating.component.html',
  styleUrls: ['./battle-rating.component.scss']
})
export class BattleRatingComponent implements OnInit {

  public ratingMain: BattleRating[] = [];
  public ratingMy: BattleRating;

  isLoad = true;
  countLoad = 0;

  memotypeColors = [];
  memotypeNames = [];

  public ratingCarousel: any;

  constructor(
    public battleApi: BattleApiService,
    public avatarApi: MemetickAvatarApiService,
    private router: Router
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;

    this.initCarousel();
  }

  ngOnInit() {
    this.battleApi.ratingMain().subscribe(data => {
      this.ratingMain = data;
      this.load();
    });

    this.battleApi.ratingMy().subscribe(data => {
      this.ratingMy = data;
      this.load();
    });
  }

  load() {
    this.countLoad++;
    this.isLoad = this.countLoad >= 2;
  }

  getAvatar(memetick: MemetickPreview) {
    return this.avatarApi.dowloadAvatar(memetick.id);
  }

  memetickView(memetick: MemetickPreview) {
    this.router.navigate(['/home/memetick', memetick.id]);
  }

  toBattle() {
    this.router.navigateByUrl('/battle');
  }

  private initCarousel() {
    this.ratingCarousel = {
      loop: true,
      dots: true,
      autoplay: false,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 3
        },
        1368: {
          items: 5
        }
      }
    };
  }
}
