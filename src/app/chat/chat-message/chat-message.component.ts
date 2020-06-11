import {Component, Input, OnInit} from '@angular/core';
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

  constructor(
    private avatarService: MemetickAvatarApiService
  ) { }

  ngOnInit() {
  }

  get avatar() {
    return this.avatarService.dowloadAvatar(this.message.memetickId);
  }
}
