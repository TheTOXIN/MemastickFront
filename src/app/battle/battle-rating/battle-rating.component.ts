import { Component, OnInit } from '@angular/core';
import {BattleRating} from '../../model/battle/BattleRating';
import {BattleApiService} from '../../api/battle-api-service';
import {BattleConst} from '../../consts/BattleConst';
import {memotypeColors, memotypeNames} from '../../consts/MemotypeData';
import {MemetickPreview} from '../../model/MemetickPreview';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {UUID} from 'angular2-uuid';
import {Router} from '@angular/router';
import {IntroModalComponent} from '../../modals/intro-modal/intro-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {fakeAsync} from '@angular/core/testing';

@Component({
  selector: 'app-battle-rating',
  templateUrl: './battle-rating.component.html',
  styleUrls: ['./battle-rating.component.scss']
})
export class BattleRatingComponent implements OnInit {

  public ratingMain: BattleRating[] = [];
  public ratingMy: BattleRating;

  isLoad = false;
  myShow = false;

  memotypeColors = [];
  memotypeNames = [];

  public ratingCarousel: any;

  public ratingAvatars = [];
  public myAvatar: string;

  constructor(
    public battleApi: BattleApiService,
    public avatarApi: MemetickAvatarApiService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.memotypeColors = memotypeColors;
    this.memotypeNames = memotypeNames;

    this.initCarousel();
  }

  ngOnInit() {
    this.battleApi.ratingMain().subscribe(data => {
      this.ratingMain = data;
      for (const br of this.ratingMain) {
        if (br.memetick == null) { continue; }
        this.ratingAvatars[br.memetick.id + ''] = this.getAvatar(br.memetick);
      }
      this.isLoad = true;
    });
  }

  loadMyRating() {
    this.myShow = true;
    this.battleApi.ratingMy().subscribe(data => {
      this.ratingMy = data;
      this.myAvatar = this.getAvatar(data.memetick);
    });
  }

  getAvatar(memetick: MemetickPreview) {
    return this.avatarApi.dowloadAvatar(memetick.id);
  }

  memetickView(memetick: MemetickPreview) {
    this.router.navigate(['/memetick', memetick.id]);
  }

  toBattle() {
    this.router.navigateByUrl('/battle');
  }

  info() {
    const modalRef = this.modalService.open(IntroModalComponent);
    modalRef.componentInstance.title = 'РЕЙТИНГ БИТВ';
    modalRef.componentInstance.content = 'Чтобы занять место в рейтинге, принимайте участие в битвах. ' +
      'Как только вы попадете в рейтинг у вас будет ' + BattleConst.RATING_DAY + ' дней, до подведения итогов. ' +
      'После подвдения итогов, если вы вошли в ТОП-' + BattleConst.RATING_SIZE + ', вы получите случайный мемотип определенный редкости. ' +
      'Показатель рейтинга это - PVP очки завершенной битвы, если вы выиграли то PVP очки прибавляются, иначе отнимаются. ' +
      'Чтобы оставаться в рейтинге ваш показатель должен быть > 0';
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
