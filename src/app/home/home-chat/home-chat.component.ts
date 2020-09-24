import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat-service';
import {ChatMessage} from '../../model/chat/ChatMessage';
import {Router} from '@angular/router';
import {ChatUtils} from '../../utils/chat-utils';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.scss']
})
export class HomeChatComponent implements OnInit {

  @Input()
  public messages: ChatMessage[];

  @Input()
  public memetickId: UUID;

  isLoad = false;
  isBtn = false;

  constructor(
    private chatService: ChatService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.messages != null && this.memetickId != null) {
      for (const msg of this.messages) {
        ChatUtils.prepare(msg, this.messages, this.memetickId, false);
      }
      this.isLoad = true;
    }
  }

  scroller(e: any) {
    if (e === 'down') {
      this.isBtn = true;
    } else if (e === 'up') {
      this.isBtn = false;
    }
  }

  toChat() {
    this.router.navigateByUrl('/chat');
  }
}
