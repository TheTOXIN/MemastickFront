import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DONAT} from '../../app.constants';
import {DonateApiService} from '../../api/donate-api-service';
import {DonateRating} from '../model/DonateRating';
import {memotypeColors} from '../../consts/MemotypeData';
import {GlobalConst} from '../../consts/GlobalConst';

@Component({
  selector: 'app-donate-ratings',
  templateUrl: './donate-ratings.component.html',
  styleUrls: ['./donate-ratings.component.scss']
})
export class DonateRatingsComponent implements OnInit {

  public ratings: DonateRating[] = [];
  public memotypeColors = memotypeColors;

  isLoad = false;
  donatHref = DONAT;

  readonly cost = GlobalConst.DONATE_RATE + 'руб-' + (GlobalConst.DONATE_RATE * 5) + 'руб';

  constructor(
    private router: Router,
    private donateApi: DonateApiService
  ) {

  }

  ngOnInit() {
    this.donateApi.readRating().subscribe(data => {
      this.ratings = data;
      this.isLoad = true;
    });
  }

  toMain() {
    this.router.navigateByUrl('/donate');
  }

  toDonat() {
    window.open(this.donatHref, '_blank');
  }

  close() {
    window.history.back();
  }
}
