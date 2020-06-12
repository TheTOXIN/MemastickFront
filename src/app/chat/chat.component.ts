import {Component, OnInit, ViewChild} from '@angular/core';
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
import {User} from '../model/User';
import {OauthApiService} from '../services/oauth-api-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild(MemetickCardComponent) card: MemetickCardComponent;
  @ViewChild(MemotypeViewComponent) view: MemotypeViewComponent;

  public messages: ChatMessage[] = [];

  public text: string;
  public memetickId: UUID;
  public memotype: Memotype;

  public chatPage: number = 0;
  public mode: ChatMessageMode = ChatMessageMode.TEXT;

  canDelete = false;
  loadSend = false;

  isConnect = false;
  isLoad = false;

  modes = ChatMessageMode;
  maxLenText = ValidConst.MAX_MEME_TEXT;

  constructor(
    private router: Router,
    private socket: WebSocketService,
    private chatService: ChatService,
    private storage: StorageService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private oauthApi: OauthApiService
  ) {
    const me = this.storage.getMe();

    if (me == null) {
      this.oauthApi.readMe().subscribe(data => this.initMe(data));
    } else {
      this.initMe(me);
    }
  }

  ngOnInit() {
    this.connect();
    this.watcher();
  }

  initMe(me: User) {
    this.memetickId = me.memetickId;
    this.canDelete = me.role === RoleType.ADMIN;
  }

  connect() {
    this.load();
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

  load() {
    this.isLoad = true;

    this.chatService.read(this.chatPage++).subscribe(data => {
      for (const msg of data) {
        msg.my = msg.memetickId === this.memetickId;
        this.messages.unshift(msg);
      }
      this.isLoad = false;
    });
  }

  send() {
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
    this.socket.send('/chat/send', message);
    this.mode = ChatMessageMode.TEXT;
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
      this.load();
    }
  }
}
