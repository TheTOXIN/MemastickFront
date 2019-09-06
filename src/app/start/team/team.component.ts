import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TeamModalComponent} from '../../modals/team-modal/team-modal.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  public team = [ {
    image: 'assets/images/info/1.png',
    social: this._sanitizer.bypassSecurityTrustHtml('МЕМКОЙНЫ'),
    message: 'Это как биткойны, только не биткойны',
    description: 'Мемкойны - местная валюта, которую можно получить за победу в битвах или с помощью майнинга. ' +
      'Майнинг происходит путем перебора хешей, для этого вам нужна - кирка, один удар - один подбор хеша. Кол-во ударов ограничено. ' +
      'Если вы нашли нужный хеш, который начинается с цифры ноль, вы получайте 1 мемкойн. ' +
      'После того как вы забирайте все мемкойны, новую кирку вы получите через 1 час',
    borderColor: 'gold'
  }, {
    image: 'assets/images/info/3.png',
    social: this._sanitizer.bypassSecurityTrustHtml('МЕМОТИПЫ'),
    message: 'Собери их всех',
    description: 'Мемотипы это аналог - "стикеров", на темы самых различных мемов, которые можно коллекционировать' +
      'Они делятся на 5 видов редкости: КЛАССИЧЕСКИЙ, РЕДКИЙ, ЭПИЧЕСКИЙ, ЛЕГЕНДАРНЫЙ, НЕВЕРОЯТНЫЙ.' +
      'Мемотипы можно: покупать, выигрывать, и (*В разработке) обменивать',
    borderColor: 'cornflowerblue'
  }, {
    image: 'assets/images/info/4.png',
    social: this._sanitizer.bypassSecurityTrustHtml('МОТИВАТОРЫ'),
    message: 'Это все тебе',
    description: 'Мотиваторы - это вознаграждения которые даются за заслуги в исследованиях. Они бывают 3 видов: ' +
      'ПОСОБИЕ - содержит токены, выдается ежедневно, зависит от уровня меметика. ' +
      '(*В разработке) ПРЕМИИ - может содержитать: токены, днк, мемотипы, мемкойны, дается за переодичные достижения в системе. ' +
      '(*В разработке) ГРАНТЫ - получают за определеные цели и иследования, дают новые возможности меметикам',
    borderColor: '#B10800'
  }, {
    image: 'assets/images/info/5.png',
    social: this._sanitizer.bypassSecurityTrustHtml('*ЗВАНИЯ'),
    message: 'Мама я хочу быть мемологом',
    description: '(*В разработке) Звания - это уровень вышей прокачки. ' +
      'Чем больше ДНК, тем выше ваше звание, чем выше звание, тем больше у вас возможностей. ' +
      'Максимальный уровень это 50, что равняется 1.000.000 ДНК. ' +
      'С каждым 10 уровнем вы получаете новый вид токена к пособию',
    borderColor: '#34992c'
  }, {
    image: 'assets/images/info/2.png',
    social: this._sanitizer.bypassSecurityTrustHtml('БИТВЫ'),
    message: 'ПВП или засал?',
    description: 'Если ваш мем достиг состояние особи, вы можете вызывать на поединок других особей. ' +
      'Битва происходит методом голосования с помощью печенек.' +
      'Победившим владелец особи получает мемкойны а, проигравший мем погибает.' +
      'Зайдите на страницу битв чтобы узнать правила подробнее',
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
