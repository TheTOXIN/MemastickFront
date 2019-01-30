import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-view-modal',
  templateUrl: './image-view-modal.component.html',
  styleUrls: ['./image-view-modal.component.scss']
})
export class ImageViewModalComponent implements OnInit {

  @Input()
  public meme;

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }

}