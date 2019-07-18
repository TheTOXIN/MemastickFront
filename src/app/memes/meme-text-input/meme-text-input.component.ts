import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-meme-text-input',
  templateUrl: './meme-text-input.component.html',
  styleUrls: ['./meme-text-input.component.scss']
})
export class MemeTextInputComponent implements OnInit {

  @Output()
  public doneEvent = new EventEmitter<string>();

  isShow = false;
  textMeme: string;

  constructor() { }

  ngOnInit() {
  }

  show(textMeme: string) {
    this.textMeme = textMeme;
    this.isShow = true;
  }

  done() {
    this.isShow = false;
    this.doneEvent.emit(this.textMeme);
  }
}
