import {Component, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickListModalComponent} from '../../memetick/memetick-list-modal/memetick-list-modal.component';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-chat-online',
  templateUrl: './chat-online.component.html',
  styleUrls: ['./chat-online.component.scss'],
  animations: [trigger('countState', [
    transition('* => *', [
      animate(300, keyframes([
        style({ transform: 'scale(1)' }),
        style({ transform: 'scale(1.3)' }),
        style({ transform: 'scale(1)' })
      ]))
    ])
  ])]
})
export class ChatOnlineComponent implements OnInit {

  public online: UUID[] = [];
  public count = 0;

  constructor(
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.count = this.online.length;
  }

  onlineList() {
    const ref = this.modalService.open(MemetickListModalComponent, {'centered': true});
    ref.componentInstance.memetickIds = this.online;
  }

  public init(online: UUID[]) {
    this.online = online;
  }

  public add(id: UUID) {
    this.online.push(id);
    this.count++;
  }

  public min(id: UUID) {
    for (let i = 0; i < this.online.length; i++) {
      if (this.online[i] === id) {
        this.online.splice(i, 1);
        this.count--;
      }
    }
  }
}
