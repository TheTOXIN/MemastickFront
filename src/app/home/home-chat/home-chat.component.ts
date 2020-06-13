import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat-service';
import {ChatMessage} from '../../model/chat/ChatMessage';
import {Router} from '@angular/router';
import {ChatUtils} from '../../utils/chat-utils';
import {UUID} from 'angular2-uuid';
import {StorageService} from '../../services/storage-service';

@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.scss']
})
export class HomeChatComponent implements OnInit {

  public messages: ChatMessage[] = [];
  public memetickId: UUID;

  isLoad = true;
  isBtn = false;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private storage: StorageService
  ) {
    this.memetickId = storage.getMe().memetickId;
  }

  ngOnInit() {
    this.chatService.read(0, 5).subscribe(data => {
      for (const msg of data) {
        ChatUtils.prepare(msg,  data, this.memetickId, false);
      }

      this.messages = data;
      this.isLoad = false;
    });
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
