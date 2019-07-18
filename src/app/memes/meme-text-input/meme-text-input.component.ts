import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GlobalConst} from '../../consts/GlobalConst';

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

    if (this.textMeme.length > GlobalConst.MAX_TEXT_LEN) {
      this.textMeme = this.textMeme.substring(0, GlobalConst.MAX_TEXT_LEN);
    }

    this.doneEvent.emit(this.textMeme);
  }
}
