import { Component, OnInit } from '@angular/core';
import {DonateApiService} from '../api/donate-api-service';
import {DonateMessage} from './model/DonateMessage';
import {MemotypeRarity} from '../consts/MemotypeRarity';
import {DonateRating} from './model/DonateRating';
import {DONAT} from '../app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  public message: DonateMessage;
  public rating: Map<MemotypeRarity, DonateRating[]>;

  readonly donateHref = DONAT;
  isLoad = false;

  constructor(
    private donateApi: DonateApiService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.donateApi.read().subscribe(data => {
      this.message = data.message;
      this.rating = data.rating;

      this.isLoad = true;
    });
  }

  toMessages() {
    this.router.navigateByUrl('/donate/messages');
  }

  toRatings() {
    this.router.navigateByUrl('/donate/ratings');
  }

  toDonate() {
    window.open(this.donateHref, '_blank');
  }

  toBack() {
    window.history.back();
  }
}
