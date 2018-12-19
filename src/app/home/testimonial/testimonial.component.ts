import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  // Testimonial Carousel
  public testimonial = [{
    image: 'assets/images/tokens/1.png',
    name: 'Органика',
    designation: 'Токен создания',
    description: 'сроки горят, релиз через год!!!!!!',
  }, {
    image: 'assets/images/tokens/2.png',
    name: 'Фитнес',
    designation: 'Токен оценки',
    description: 'сроки горят, релиз через год!!!!!!',
  }, {
    image: 'assets/images/tokens/3.png',
    name: 'Антибиотик',
    designation: 'Токен выживания',
    description: 'сроки горят, релиз через год!!!!!!',
  },
    {
      image: 'assets/images/tokens/4.png',
      name: 'Кроссовер',
      designation: 'Токе скрещивания',
      description: 'сроки горят, релиз через год!!!!!!',
    },
    {
      image: 'assets/images/tokens/5.png',
      name: 'Мутаген',
      designation: 'Токен мутации',
      description: 'сроки горят, релиз через год!!!!!!',
    }
  ];
  // Testimonial Carousel Options
  public testimonialCarousel: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    items: 1
  };

  constructor() {
  }

  ngOnInit() {
  }

}
