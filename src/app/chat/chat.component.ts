import {Component, OnInit} from '@angular/core';
import {WebSocketService} from '../services/web-socket-service';
import {ChatService} from '../services/chat-service';
import {ChatMessage} from '../model/chat/ChatMessage';
import {UUID} from 'angular2-uuid';
import {ChatMessageMode} from '../consts/ChatMessageMode';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private socket: WebSocketService,
    private chatService: ChatService
  ) {

  }

  ngOnInit() {
    this.socket.chaterObservable.subscribe(data => {
      if (data != null) {
        console.log(data);
      }
    });
  }

  test() {
    const message = new ChatMessage();

    message.text = 'TEST';
    message.nick = 'TEST';
    message.memetickId = UUID.UUID();
    message.mode = ChatMessageMode.TEXT;

    this.socket.send('/chat/send', message);
  }
}
