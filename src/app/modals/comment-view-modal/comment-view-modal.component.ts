import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-comment-view-modal',
  templateUrl: './comment-view-modal.component.html',
  styleUrls: ['./comment-view-modal.component.scss']
})
export class CommentViewModalComponent implements OnInit {

  @Input()
  public memeId: UUID;

  constructor() { }

  ngOnInit() {
  }
}
