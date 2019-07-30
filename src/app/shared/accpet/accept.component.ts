import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {

  @Output()
  public accept = new EventEmitter<boolean>();

  @Input()
  public img: string;

  public text: string;
  public isShow = false;

  constructor() {

  }

  ngOnInit() {

  }

  show(text?: string) {
    this.text = text;
    this.isShow = true;
  }

  yes() {
    this.acceptEvent(true);
  }

  no() {
    this.acceptEvent(false);
  }

  acceptEvent(res: boolean) {
    this.accept.emit(res);
    this.isShow = false;
  }
}

