import {Component, Input, OnInit} from '@angular/core';
import {DonateRating} from '../model/DonateRating';

@Component({
  selector: 'app-donate-rating-tab',
  templateUrl: './donate-rating-tab.component.html',
  styleUrls: ['./donate-rating-tab.component.scss']
})
export class DonateRatingTabComponent implements OnInit {

  @Input()
  public donate: DonateRating;

  @Input()
  public color: any;

  constructor() { }

  ngOnInit() {
  }

}
