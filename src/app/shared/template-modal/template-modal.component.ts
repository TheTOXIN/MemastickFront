import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }

  public close() {
    this.activeModal.close();
    this.closer.emit(null);
  }
}
