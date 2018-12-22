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
    name: 'Инициализация',
    designation: 'Токен создания',
    description: 'используется для создания нового мема',
  }, {
    image: 'assets/images/tokens/2.png',
    name: 'Фитнесинг',
    designation: 'Токен оценки',
    description: 'даёт 30 очков для оценки 3 критериев мема (ЛОЛ, ОМГ, ХММ)',
  }, {
    image: 'assets/images/tokens/3.png',
    name: 'Селекшен',
    designation: 'Токен выживания',
    description: 'удваивает у мема шанс выжить в x2 раз',
  }, {
    image: 'assets/images/tokens/4.png',
    name: 'Кроссовер',
    designation: 'Токе скрещивания',
    description: 'позволяет создать новый мем на основе двух дргуих',
  }, {
    image: 'assets/images/tokens/5.png',
    name: 'Мутаген',
    designation: 'Токен мутации',
    description: 'с его помощью можно оставлять комментарии под мемами',
  }];
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
