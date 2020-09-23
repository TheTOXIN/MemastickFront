import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DONAT} from '../../app.constants';
import {DonateApiService} from '../../api/donate-api-service';
import {DonateRating} from '../model/DonateRating';
import {memotypeColors} from '../../consts/MemotypeData';

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
