import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemotypeReadModalComponent} from '../memotype/memotype-read-modal/memotype-read-modal.component';
import {Memotype} from '../model/memotype/Memotype';
import {MemotypeViewComponent} from '../memotype/memotype-view/memotype-view.component';
import {OauthApiService} from '../services/oauth-api-service';
import {ChatUtils} from '../utils/chat-utils';
import {GlobalConst} from '../consts/GlobalConst';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild(MemetickCardComponent) card: MemetickCardComponent;
  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  @ViewChild('mainChat', {read: ElementRef}) public chat: ElementRef<any>;

  public messages: ChatMessage[] = [];

  public text: string;
  public memetickId: UUID;
  public memotype: Memotype;

  public chatPage: number = 0;
  public chatSize: number = 10;

  private soundSend = new Audio();
  private soundReceive = new Audio();

  public mode: ChatMessageMode = ChatMessageMode.TEXT;

  canDelete = false;
  loadSend = false;

  isLoad = false;
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
    private modalService: NgbModal,
    private oauth: OauthApiService,
    private changeDetectionRef: ChangeDetectorRef
  ) {
    this.chatSize = Math.min(Math.round(window.innerHeight / 100) * 2, GlobalConst.CHAT_SIZE);

    this.soundSend.src = '../../../assets/audio/chat_send.wav';
    this.soundReceive.src = '../../../assets/audio/chat_receive.wav';

    this.soundSend.volume = 0.5;
    this.soundReceive.volume = 0.5;
  }

  ngOnInit() {
    this.user();
    this.connect();
    this.sounds();
    this.load();
    this.watch();
  }

  ngOnDestroy(): void {
    this.socket.unsubscribe('chatId');
    this.socket.chaterBehavior.next(null);
  }

  user() {
    this.oauth.readMe().then(res => {
      this.memetickId = res.memetickId;
      this.canDelete = res.role === RoleType.ADMIN;
    });
  }

  connect() {
    const onConnect = () => {
      this.socket.chater();
      this.isConnect = true;
    };

    if (this.socket.isConnect) {
      onConnect();
    } else {
      this.socket.connectEvent.subscribe(data => {
        if (data) {
          onConnect();
        }
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
        ChatUtils.prepare(data, this.messages, this.memetickId, true);

        if (data.my) {
          this.loadSend = false;
          this.isScroll = true;
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
    if (!this.isConnect) {
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
    this.mode = ChatMessageMode.TEXT;

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

  memetickCard(memetickId: UUID) {
    this.card.showCard(memetickId);
  }

  memotypeView() {
    this.view.viewShow(this.memotype);
  }

  memotypeLoad(memotypeId: UUID) {
    this.view.viewLoad(memotypeId);
  }

  stick() {
    const modalRef = this.modalService.open(MemotypeReadModalComponent, {'centered': true});

    modalRef.componentInstance.memetickId = this.memetickId;
    modalRef.componentInstance.selectMode = true;

    modalRef.componentInstance.selectEvent.subscribe((result: Memotype) => {
      if (result != null) {
        this.mode = ChatMessageMode.STICKER;
        this.memotype = result;
      }
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
