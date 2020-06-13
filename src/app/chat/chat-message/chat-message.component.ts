import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from '../../model/chat/ChatMessage';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {UUID} from 'angular2-uuid';
import {ChatMessageMode} from '../../consts/ChatMessageMode';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input()
  public message: ChatMessage;

  @Input()
  public withDelete: boolean = false;

  @Output()
  public whenDelete = new EventEmitter<Number>();

  @Output()
  public showMemetick = new EventEmitter<UUID>();

  @Output()
  public viewMemotype = new EventEmitter<UUID>();

  modes = ChatMessageMode;

  constructor(
    private avatarService: MemetickAvatarApiService,
  ) {

  }

  ngOnInit() {
  }

  memetick() {
    this.showMemetick.emit(this.message.memetickId);
  }

  memotpye() {
    this.viewMemotype.emit(this.message.memotypeId);
  }

  delete() {
    if (confirm('DELETE ?')) {
      this.whenDelete.emit(this.message.number);
    }
  }

  get getClasses() {
    return {
      'chat-message-direct fadeInLeft': this.message.direct,
      'animated faster': this.message.anim,
      'fadeInRight': !this.message.direct
    };
  }

  get avatar() {
    return this.avatarService.dowloadAvatar(this.message.memetickId);
  }
}
