import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-memes-swiper',
  templateUrl: './memes-swiper.component.html',
  styleUrls: ['./memes-swiper.component.scss']
})
export class MemesSwiperComponent implements OnInit {

  public cards = [{
    number: 1,
    color: 'red'
  }, {
    number: 2,
    color: 'green'
  }, {
    number: 3,
    color: 'blue'
  }, {
    number: 4,
    color: 'pink'
  }, {
    number: 5,
    color: 'yellow'
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
