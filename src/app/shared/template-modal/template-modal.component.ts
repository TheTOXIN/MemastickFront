import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Meme} from '../../model/Meme';

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
