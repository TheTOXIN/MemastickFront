import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickListModalComponent} from '../../memetick/memetick-list-modal/memetick-list-modal.component';

@Component({
  selector: 'app-chat-online',
  templateUrl: './chat-online.component.html',
  styleUrls: ['./chat-online.component.scss']
})
export class ChatOnlineComponent implements OnInit {

  @Input()
  public online: UUID[] = [];

  constructor(
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {

  }

  onlineList() {
    const ref = this.modalService.open(MemetickListModalComponent, {'centered': true});
    ref.componentInstance.memetickIds = this.online;
  }
}
