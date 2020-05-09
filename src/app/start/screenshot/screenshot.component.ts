import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

  public screens = [
    'Дом',
    'Лента',
    'Битвы',
    'Меню',
    'Мемотипы',
    'Создние',
    'Майнинг',
    'Профиль'
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
