import {Component, OnInit} from '@angular/core';
import {TokenData, tokensData} from '../../model/TokenData';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  public tokens: TokenData[];

  // Testimonial Carousel Options
  public testimonialCarousel: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    items: 1
  };

  constructor() {
    this.tokens = tokensData;
  }

  ngOnInit() {
  }
}
