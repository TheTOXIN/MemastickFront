import {Component, OnInit} from '@angular/core';
import {AcceptState} from '../../state/accept-state';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {

  public img: string;
  public text: string;

  constructor(
    private state: AcceptState
  ) {
    const options = state.options;

    this.img = options.img;
    this.text = options.text;
  }

  ngOnInit() {

  }

  yes() {
    this.state.modal.close('yes');
  }

  no() {
    this.state.modal.dismiss('no');
  }
}

