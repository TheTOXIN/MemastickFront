import {Component, Input, OnInit} from '@angular/core';
import {VERSION} from '../../app.constants';

@Component({
  selector: 'app-preview-update',
  templateUrl: './preview-update.component.html',
  styleUrls: ['./preview-update.component.scss']
})
export class PreviewUpdateComponent implements OnInit {

  @Input()
  public vers = VERSION;

  constructor() { }

  ngOnInit() {
  }
}
