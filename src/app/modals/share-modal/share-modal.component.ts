import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {StorageService} from '../../services/storage-service';
import {RoleType} from '../../consts/RoleType';
import {FRONT_URL} from '../../app.constants';
import {TranslatorApiService} from '../../api/translator-api-service';
import {MemeApiService} from '../../api/meme-api-service';
import {AcceptService} from '../../services/accept-service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {

  @Input()
  public memeId: UUID;
  public memeURL;

  public role = RoleType.USER;

  constructor(
    private acceptService: AcceptService,
    public activeModal: NgbActiveModal,
    public storage: StorageService,
    public translatorApi: TranslatorApiService,
    public memeApi: MemeApiService
  ) {
    this.role = this.storage.getRole();
  }

  ngOnInit() {
    this.memeURL = FRONT_URL + '/memes/share/' + this.memeId;
  }

  cp(input) {
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }

  tg() {
    this.share('tg://msg?text=');
  }

  vk() {
    this.share('https://vk.com/share.php?url=');
  }

  translateAdmin() {
    this.acceptService.accept({
      img: 'assets/images/tokens/tmp.png',
      text: 'ПУБЛИКОВАТЬ'
    }).then(
      () => this.translatorApi.adminPublish(this.memeId),
      () => {}
    );
  }

  banMeme() {
    this.acceptService.accept({
      img: 'assets/images/tokens/tmp.png',
      text: 'ЗАБАНИТЬ'
    }).then(
      () => this.memeApi.memeBan(this.memeId),
      () => {}
    );
  }

  share(source: string) {
    const shareURl = source + this.memeURL;
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = shareURl;
    document.body.appendChild(a);
    a.click();
  }
}
