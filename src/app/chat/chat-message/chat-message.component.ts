import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatMessage} from '../../model/chat/ChatMessage';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input()
  public message: ChatMessage;

  @Input()
  public withDelete: boolean;

  @Output()
  public whenDelete = new EventEmitter<Number>();

  constructor(
    private avatarService: MemetickAvatarApiService,
  ) {

  }

  ngOnInit() {
  }

  delete() {
    if (confirm('DELETE ?')) {
      this.whenDelete.next(this.message.number);
    }
  }

  get avatar() {
    return this.avatarService.dowloadAvatar(this.message.memetickId);
  }
}
