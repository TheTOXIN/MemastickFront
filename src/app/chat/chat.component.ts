import {ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WebSocketService} from '../services/web-socket-service';
import {ChatService} from '../services/chat-service';
import {ChatMessage} from '../model/chat/ChatMessage';
import {ChatMessageMode} from '../consts/ChatMessageMode';
import {Router} from '@angular/router';
import {StorageService} from '../services/storage-service';
import {UUID} from 'angular2-uuid';
import {ValidConst} from '../consts/ValidConst';
import {RoleType} from '../consts/RoleType';
import {MemetickCardComponent} from '../memetick/memetick-card/memetick-card.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Memotype} from '../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype/memotype-view/memotype-view.component';
import {OauthApiService} from '../services/oauth-api-service';
import {ChatUtils} from '../utils/chat-utils';
import {GlobalConst} from '../consts/GlobalConst';
import {interval} from 'rxjs';
import {CardService} from '../services/card-service';
import {MemotypeSet} from '../model/memotype/MemotypeSet';
import {MemotypesReadComponent} from '../memotype/memotypes-read/memotypes-read.component';
import {MemotypeOptions} from '../options/MemotypeOptions';
import {ChatOnlineComponent} from './chat-online/chat-online.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('mainChat', {read: ElementRef}) public chat: ElementRef<any>;

  @ViewChild(MemotypeViewComponent) memotypeView: MemotypeViewComponent;
  @ViewChild(ChatOnlineComponent) countOnline: ChatOnlineComponent;

  public messages: ChatMessage[] = [];

  public text: string;
  public inputText: string;

  public mode: ChatMessageMode;
  public memetickId: UUID;

  public memotype: Memotype;
  public memotypes: MemotypeSet[];

  public chatPage: number = 0;
  public chatSize: number = 10;

  public blockSeconds: number = 5;
  public blockCounter: number = 0;

  private soundSend = new Audio();
  private soundReceive = new Audio();

  canDelete = false;
  loadSend = false;

  isLoad = false;
  isBlock = false;
  isScroll = false;
  isConnect = false;

  modes = ChatMessageMode;
  maxLenText = ValidConst.MAX_MEME_TEXT;

  constructor(
    private router: Router,
    private socket: WebSocketService,
    private chatService: ChatService,
    private storage: StorageService,
    private _sanitizer: DomSanitizer,
    private oauth: OauthApiService,
    private changeDetectionRef: ChangeDetectorRef,
    private cardService: CardService
  ) {
    this.chatSize = Math.min(Math.round(window.innerHeight / 100) * 2, GlobalConst.CHAT_SIZE);

    this.mode = ChatMessageMode.TEXT;
    this.inputText = 'Подключение...';

    this.soundSend.src = '../../../assets/audio/chat_send.wav';
    this.soundReceive.src = '../../../assets/audio/chat_receive.wav';

    this.soundSend.volume = 0.5;
    this.soundReceive.volume = 0.5;
  }

  ngOnInit() {
    this.connect();
    this.sounds();
    this.watch();
    this.load();
  }

  ngOnDestroy(): void {
    this.socket.unsubscribe('chatId');
    this.socket.chaterBehavior.next(null);

    this.connection(ChatMessageMode.DISCONNECT);
  }

  connect() {
    const onConnect = () => {
      this.chatService.connect().subscribe(data => {
        this.socket.chater();

        this.memetickId = data.id;
        this.memotypes = data.memotypes;
        this.canDelete = data.role === RoleType.ADMIN;

        this.isConnect = true;
        this.inputText = 'Писать тут...';

        this.countOnline.init(data.online);
        this.connection(ChatMessageMode.CONNECT);
      });
    };

    if (this.socket.isConnect) {
      onConnect();
    } else {
      this.socket.connectEvent.subscribe(data => {
        if (data) { onConnect(); }
      });
    }
  }

  sounds() {
    this.soundSend.load();
    this.soundReceive.load();
  }

  load(init: boolean = true) {
    this.isLoad = true;
    this.chatService.read(this.chatPage++, this.chatSize).subscribe(data => {
      const prevHeight = init ? 0 : this.chat.nativeElement.scrollHeight;

      for (const msg of data) {
        ChatUtils.prepare(msg, this.messages, this.memetickId, false);
        this.messages.unshift(msg);
      }

      this.changeDetectionRef.detectChanges();
      this.scroll(prevHeight);

      this.isLoad = false;
    });
  }

  watch() {
    this.socket.chaterObservable.subscribe(data => {
      if (data != null) {
        if (this.isConnectionMode(data)) {
          this.connector(data);
          return;
        }

        ChatUtils.prepare(data, this.messages, this.memetickId, true);

        if (data.my) {
          this.loadSend = false;
          this.isScroll = true;

          this.blocking();
        }

        this.sound(data);
        this.messages.push(data);

        if (this.isScroll) {
          this.changeDetectionRef.detectChanges();
          this.scroll();
        }
      }
    });
  }

  send() {
    if (!this.isConnect || this.isBlock || this.loadSend) {
      return;
    }

    if (this.messages.length > GlobalConst.CHAT_SIZE) {
      this.messages.splice(GlobalConst.CHAT_SIZE);
    }

    const message = new ChatMessage();

    if (this.mode === ChatMessageMode.STICKER) {
      if (this.memotype == null) {
        return;
      }

      message.sticker = this.memotype.image;
      message.memotypeId = this.memotype.id;
    }

    if (this.mode === ChatMessageMode.TEXT) {
      if (this.text == null || this.text.trim() === '' || this.loadSend) {
        return;
      }

      message.text = this.text;
      this.text = null;
    }

    message.my = true;
    message.mode = this.mode;
    message.memetickId = this.memetickId;

    this.loadSend = true;
    this.isBlock = true;

    this.mode = ChatMessageMode.TEXT;
    this.socket.send('/chat/send', message);
  }

  blocking() {
    this.blockCounter = this.blockSeconds;
    this.inputText = `Защита от спама: ${this.blockCounter}сек`;

    const blockTimer = interval(1000).subscribe((tik) => {
      if (this.blockCounter <= 0) {
        blockTimer.unsubscribe();

        this.inputText = 'Введите сообщение...';
        this.isBlock = false;
      } else {
        this.blockCounter--;
        this.inputText = `Защита от спама: ${this.blockCounter}сек`;
       }
    });
  }

  connector(msg: ChatMessage) {
    if (msg.memetickId != null && msg.memetickId !== this.memetickId) {
      if (msg.mode === ChatMessageMode.CONNECT) {
        this.countOnline.add(msg.memetickId);
      }
      if (msg.mode === ChatMessageMode.DISCONNECT) {
        this.countOnline.min(msg.memetickId);
      }
    }
  }

  connection(mode: ChatMessageMode) {
    const message = new ChatMessage();

    message.mode = mode;
    message.memetickId = this.memetickId;

    this.socket.send('/chat/send', message);
  }

  scroll(delta: number = 0) {
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight - delta;
  }

  sound(message: ChatMessage) {
    if (message.my) {
      this.soundSend.play();
    } else {
      this.soundReceive.play();
    }
  }

  delete(number: number, index: number) {
    this.chatService.delete(number);
    this.messages.splice(index, 1);
  }

  public isConnectionMode(msg: ChatMessage): boolean {
    return msg.mode === ChatMessageMode.CONNECT || msg.mode === ChatMessageMode.DISCONNECT;
  }

  memetickCard(memetickId: UUID) {
    this.cardService.open({
      content: MemetickCardComponent,
      memetickId: memetickId
    });
  }

  memotypeViewer() {
    this.memotypeView.viewShow(this.memotype);
  }

  memotypeLoad(memotypeId: UUID) {
    this.memotypeView.viewLoad(memotypeId);
  }

  stick() {
    const event = new EventEmitter<Memotype>();

    event.subscribe(result => {
      if (result != null) {
        this.mode = ChatMessageMode.STICKER;
        this.memotype = result;
      }
    });

    const options: MemotypeOptions = {
      memetickId: this.memetickId,
      collection: this.memotypes,
      selectMode: true,
      selectEvent: event
    };

    this.cardService.open({
      content: MemotypesReadComponent,
      memotypes: options
    });
  }

  texter() {
    this.mode = ChatMessageMode.TEXT;
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  scroller(e) {
    if (e === 'top') {
      this.load(false);
    } else if (e === 'bottom') {
      this.isScroll = true;
    } else if (e === 'up') {
      this.isScroll = false;
    }
  }
}
