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
    name: 'Пробирка',
    designation: 'Токен адаптации',
    description: 'адаптирует мем продвигая его вверх в списке',
  }, {
    image: 'assets/images/tokens/2.png',
    name: 'Микроскоп',
    designation: 'Токен оценки',
    description: 'даёт 30 очков для оценки 3 критериев мема (ЛОЛ, ОМГ, ХММ)',
  }, {
    image: 'assets/images/tokens/3.png',
    name: 'Мутаген',
    designation: 'Токен мутации',
    description: 'с его помощью можно оставлять комментарии под мемами',
  }, {
    image: 'assets/images/tokens/4.png',
    name: 'Кроссовер',
    designation: 'Токен скрещивания',
    description: 'позволяет создать новый мем на основе других мемов',
  }, {
    image: 'assets/images/tokens/5.png',
    name: 'Антибиотик',
    designation: 'Токен отбора',
    description: 'даёт иммунитет мему, гарантируя выживаемость',
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
