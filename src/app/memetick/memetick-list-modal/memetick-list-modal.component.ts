import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-memetick-list-modal',
  templateUrl: './memetick-list-modal.component.html',
  styleUrls: ['./memetick-list-modal.component.scss']
})
export class MemetickListModalComponent implements OnInit {

  @Input()
  public memetickIds: UUID[] = [];

  constructor() { }

  ngOnInit() {
  }
}
