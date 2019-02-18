import {Component, Input, OnInit} from '@angular/core';
import {MemeData} from '../../model/MemeData';

@Component({
  selector: 'app-memes-page',
  templateUrl: './memes-page.component.html',
  styleUrls: ['./memes-page.component.scss']
})
export class MemesPageComponent implements OnInit {

  @Input()
  public data: MemeData;

  @Input()
  public test: string;

  constructor() { }

  ngOnInit() {
  }

}
