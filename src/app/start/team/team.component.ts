import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TeamModalComponent} from './team-modal/team-modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  // Team Carousel
  public team = [ {
    image: 'assets/images/info/3.png',
    social: this._sanitizer.bypassSecurityTrustHtml('МЕМОТИПЫ'),
    message: 'Собери их всех',
    description: 'Мемотипы это аналог - "стикеров", на темы самых популярных мемов. Они делятся на 5 видов редкости: КЛАССИЧЕСКИЙ, ГОДНЫЙ, ОРНЫЙ, МЕМИЧЕСКИЙ, СВЕРХ МЕМОТИП. Мемотипы можно: покупать, торговать и обменивать',
    borderColor: 'cornflowerblue'
  }, {
    image: 'assets/images/info/4.png',
    social: this._sanitizer.bypassSecurityTrustHtml('МОТИВАТОРЫ'),
    message: 'Это все тебе',
    description: 'Мотиваторы - это вознаграждения которые даются за заслуги в исследованиях. Бывают 3 видов: ПОСОБИЕ - содержит токены, дается ежедневно, зависит от уровня меметика. ПРЕМИИ - содержит токены и днк, дается за переодичные достижения в системе. ГРАНТЫ - получают за определеные цели и иследования, дают новые возможности меметикам',
    borderColor: '#B10800'
  }, {
    image: 'assets/images/info/1.png',
    social: this._sanitizer.bypassSecurityTrustHtml('МЕМКОЙНЫ'),
    message: 'Это как биткойны, только не биткойны',
    description: 'Мемкойны - местаная валюта, которую можно получить только за победу в батлах. Мемкойны свободный ресурс и его можно будет передовать другим. Потрать мемкойны можно на покупку мемотипов, или воскрешение мема',
    borderColor: 'gold'
  }, {
    image: 'assets/images/info/5.png',
    social: this._sanitizer.bypassSecurityTrustHtml('ЗВАНИЯ'),
    message: 'Мама я хочу быть мемологом',
    description: 'Чем больше ДНК, тем выше ваше звание, чем выше звание, тем больше у вас возможностей.',
    borderColor: '#34992c'
  }, {
    image: 'assets/images/info/2.png',
    social: this._sanitizer.bypassSecurityTrustHtml('БАТЛЫ'),
    message: 'ПВП или засал?',
    description: 'Если ваш мем достиг состояние особи, вы можете вызывать на поединок других особей. Битва происходит методом голосования. Мем собравший большие кол-во голосов считается победившим. Проигравший мем погибает.',
    borderColor: '#999999'
  }];
  // Team Carousel Options
  public teamCarousel: any = {
    loop: false,
    margin: 15,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2,
        margin: 12
      },
      600: {
        items: 2
      },
      767: {
        items: 2
      },
      768: {
        items: 2,
        margin: 15
      },
      992: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };

// DomSanitizer for safe html content.
  constructor(private _sanitizer: DomSanitizer, private modalService: NgbModal) {
  }

  showModal(index: number) {
    const modalRef = this.modalService.open(TeamModalComponent);
    modalRef.componentInstance.current = this.team[index];
  }

}
