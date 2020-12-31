import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  private messagesOne = [
    'Хааааай',
    'Когда релиз?',
    'Как тебе мой мем?',
    '10010001001',
    'Что думаешь?',
    'Где новые мемы?',
    'А я покакал кста',
    'Одэмен петух',
    'Есть тут кто?',
    'Сиди дома дурак',
    'Мемов не будет'
  ];

  private messagesTwo = [
    'Не важно',
    'Нормас )0))',
    'А ты кто такой?',
    'Кааавооо',
    'Осуждаю такое',
    'Я хочу питсы',
    'У меня лапки',
    'Зачем ты так',
    'Аахаххааах',
    'Надеюсь на лучшее',
    'Мемастик все...'
  ];

  public firstMessage = '';
  public secondMessage = '';

  constructor(
    private router: Router
  ) {
    this.initmessages();
    this.initTimer();
  }

  ngOnInit() {
  }

  initTimer() {
    setInterval(() => this.initmessages(), 3000);
  }

  initmessages() {
    this.firstMessage = this.messagesOne[Math.floor(Math.random() * this.messagesOne.length)];
    this.secondMessage = this.messagesTwo[Math.floor(Math.random() * this.messagesTwo.length)];
  }

  toIvite() {
    this.router.navigateByUrl('/pages/invite');
  }

  toSignIn() {
    this.router.navigateByUrl('/pages/sign-in');
  }

  toSignUp() {
    this.router.navigateByUrl('/pages/sign-up');
  }
}
