import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-mem-logo',
  templateUrl: './mem-logo.component.html',
  styleUrls: ['./mem-logo.component.scss']
})
export class MemLogoComponent implements OnInit {

  public helloRandom: string;

  private helloMessages = [
    'Кажется тебе пора эволюционировать!',
    'Переходи на нашу сторону, у нас есть мемасики...',
    'Не знаю как ты сюда попал, но ты там где тебе нужно',
    'Добро пожаловать! Тебе у нас понравится :)',
    'Псс... эй... да ты, мемов не хочешь?'
  ];

  constructor() {
    this.helloRandom = this.helloMessages[Math.floor(Math.random() * this.helloMessages.length)];
  }

  ngOnInit() {
  }

}
