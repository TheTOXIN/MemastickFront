import {Component, Input, OnInit} from '@angular/core';
import {EPI} from '../../model/EPI';

@Component({
  selector: 'app-meme-epi',
  templateUrl: './meme-epi.component.html',
  styleUrls: ['./meme-epi.component.scss']
})
export class MemeEpiComponent implements OnInit {

  @Input()
  private epi: EPI;

  constructor() {

  }

  ngOnInit() {
  }
}
