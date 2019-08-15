import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShopApiService} from '../api/shop-api-service';
import {AcceptComponent} from '../shared/accpet/accept.component';
import {LoaderStatus} from '../consts/LoaderStatus';
import {ErrorCode} from '../consts/ErrorCode';
import {Router} from '@angular/router';
import {LandingFixService} from '../shared/services/landing-fix.service';
import {MemeFilter} from '../consts/MemeFilter';
import {UUID} from 'angular2-uuid';

interface Product {
  txt: string;
  url: string;
  img: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  public products: Product[] = [{
    txt: 'ПЕЧЕНЬКИ',
    url: '/cookies',
    img: '/assets/images/icon/cookie.png',
  }, {
    txt: 'МЕМОТИПЫ',
    url: '/memotypes',
    img: '/assets/images/icon/cell.png',
  }, {
    txt: 'ПОСОБИЕ',
    url: '/allowance',
    img: '/assets/images/icon/allowance.png',
  }, {
    txt: 'ГРАНТЫ',
    url: '/grants',
    img: '/assets/images/icon/books.png',
  }, {
    txt: 'КИРКИ',
    url: '/pickaxe',
    img: '/assets/images/icon/pickaxe.png',
  }, {
    txt: 'ВОСКРЕШЕНИЕ',
    url: '/resurrection',
    img: '/assets/images/icon/dead.png',
  }, {
    txt: 'НИКНЕЙМ',
    url: '/nick',
    img: '/assets/images/tokens/tmp.png',
  }, {
    txt: 'ПУБЛИКАЦИЯ',
    url: '/publish',
    img: '/assets/images/icon/community.png',
  }];

  isMain: boolean;

  constructor(
    private router: Router
  ) {
    this.isMain = this.router.url === '/shop';
  }

  redirect(url: string) {
    this.router.navigateByUrl('/shop' + url);
    this.isMain = false;
  }

  back() {
    this.router.navigateByUrl('/shop');
    this.isMain = true;
  }

  close() {
    window.history.back();
  }
}
