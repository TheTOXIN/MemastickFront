import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShopApiService} from '../api/shop-api-service';
import {AcceptComponent} from '../shared/accpet/accept.component';
import {LoaderStatus} from '../consts/LoaderStatus';
import {ErrorCode} from '../consts/ErrorCode';
import {Router} from '@angular/router';
import {LandingFixService} from '../shared/services/landing-fix.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

  constructor(
    private router: Router
  ) {
  }

  toCookies() {
    this.redirect('cookies');
  }

  redirect(url: string) {
    this.router.navigateByUrl('/shop/' + url);
  }

  back() {
    window.history.back();
  }
}
