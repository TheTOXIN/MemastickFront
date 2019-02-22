import {Component, Input, OnInit} from '@angular/core';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-meme-research',
  templateUrl: './meme-research.component.html',
  styleUrls: ['./meme-research.component.scss']
})
export class MemeResearchComponent implements OnInit {

  @Input()
  private meme: Meme;

  isPreview = false;

  constructor() { }

  ngOnInit() {
  }

  researchShow() {
    this.isPreview = true;
  }

  researchClose() {
    this.isPreview = false;
  }
}
