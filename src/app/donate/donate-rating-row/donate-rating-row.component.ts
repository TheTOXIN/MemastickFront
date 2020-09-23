import {Component, Input, OnInit} from '@angular/core';
import {DonateRating} from '../model/DonateRating';
import {memotypeColors, memotypeLvl} from '../../consts/MemotypeData';

@Component({
  selector: 'app-donate-rating-row',
  templateUrl: './donate-rating-row.component.html',
  styleUrls: ['./donate-rating-row.component.scss']
})
export class DonateRatingRowComponent implements OnInit {

  @Input()
  public donate: DonateRating;

  readonly memotypeColors = memotypeColors;
  readonly memotypeLvl = memotypeLvl;

  constructor() { }

  ngOnInit() {
  }

}
