import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AcceptOptions} from '../../options/accept-options';
import {AcceptState} from '../../state/accept-state';

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

  options: AcceptOptions;

  constructor(
    private state: AcceptState
  ) {
    this.options = state.options;
    this.isShow = true;
    this.img = this.options.img;
    this.text = this.options.text;
  }

  ngOnInit() {

  }

  show(text?: string) {
    this.text = text;
    this.isShow = true;
  }

  yes() {
    this.state.modal.close('confirmed');
    this.acceptEvent(true);
  }

  no() {
    this.state.modal.dismiss('not confirmed');
    this.acceptEvent(false);
  }

  acceptEvent(res: boolean) {
    this.accept.emit(res);
    this.isShow = false;
  }
}

