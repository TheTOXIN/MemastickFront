import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-meme-text-view',
  templateUrl: './meme-text-view.component.html',
  styleUrls: ['./meme-text-view.component.scss']
})
export class MemeTextViewComponent implements OnInit {

  @Input()
  public textMeme;

  constructor() { }

  ngOnInit() {
  }
}
