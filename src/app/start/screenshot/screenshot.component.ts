import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

  public screens = [
    'Дом',
    'Битвы',
    'Меню',
    'Лента',
    'Создание',
    'Майнинг',
    'Профиль',
    'Мемотипы'
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
