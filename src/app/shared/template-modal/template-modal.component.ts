import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-template-modal',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.scss']
})
export class TemplateModalComponent implements OnInit {

  @Input()
  public title: string;

  @Output()
  public closer = new EventEmitter<null>();

  constructor(
  ) {

  }

  ngOnInit() {
  }

  public close() {
    this.closer.emit(null);
  }
}
