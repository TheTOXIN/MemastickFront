import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GlobalConst} from '../../consts/GlobalConst';
import {ValidConst} from '../../consts/ValidConst';

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

    if (this.textMeme != null && this.textMeme.length > ValidConst.MAX_MEME_TEXT) {
      this.textMeme = this.textMeme.substring(0, ValidConst.MAX_MEME_TEXT);
    }

    this.doneEvent.emit(this.textMeme);
  }
}
