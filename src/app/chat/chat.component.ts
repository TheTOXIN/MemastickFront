import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from '../services/web-socket-service';
import {ChatService} from '../services/chat-service';
import {ChatMessage} from '../model/chat/ChatMessage';
import {ChatMessageMode} from '../consts/ChatMessageMode';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage-service';
import {UUID} from 'angular2-uuid';
import {ValidConst} from '../consts/ValidConst';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('inputChat') private inputChat: ElementRef;
  @ViewChild('mainChat') private mainChat: ElementRef;

  public messages: ChatMessage[] = [];

  public text: string;
  public memetickId: UUID;

  public mode: ChatMessageMode = ChatMessageMode.TEXT;

  loadSend = false;
  maxLenText = ValidConst.MAX_MEME_TEXT;

  constructor(
    private router: Router,
    private socket: WebSocketService,
    private chatService: ChatService,
    private storage: StorageService
  ) {
    this.memetickId = this.storage.getMe().memetickId;
  }

  ngOnInit() {
    this.watcher();
  }

  watcher() {
    this.socket.chaterObservable.subscribe(data => {
      if (data != null) {
        data.my = data.memetickId === this.memetickId;

        if (data.my) {
          this.loadSend = false;
        }

        this.messages.push(data);
      }
    });
  }

  send() {
    this.inputChat.nativeElement.focus();

    if (this.text == null || this.text.trim() === '' || this.loadSend) {
      return null;
    }

    this.loadSend = true;

    const message = new ChatMessage();

    message.my = true;
    message.text = this.text;
    message.mode = this.mode;
    message.memetickId = this.memetickId;

    this.socket.send('/chat/send', message);

    this.text = null;
  }

  stick() {
    alert('TEST');
  }

  home() {
    this.router.navigateByUrl('/home');
  }
}
