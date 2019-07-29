import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {GlobalConst} from '../../consts/GlobalConst';
import {StorageService} from '../../services/storage-service';
import {RoleType} from '../../consts/RoleType';
import {AdminApiService} from '../../api/admin-api-service';
import {AcceptComponent} from '../../shared/accpet/accept.component';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {

  @ViewChild(AcceptComponent) accept: AcceptComponent;

  @Input()
  public memeId: UUID;
  public memeURL;

  public role = RoleType.USER;

  constructor(
    public activeModal: NgbActiveModal,
    public storage: StorageService,
    public adminApi: AdminApiService,
  ) {
    this.role = this.storage.getRole();
  }

  ngOnInit() {
    this.memeURL = GlobalConst.FRONT_URL + '/memes/share/' + this.memeId;
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
    this.accept.show('ПУБЛИКОВАТЬ');
  }

  acceptTranslate(accept: boolean) {
    if (accept) {
      this.adminApi.translate(this.memeId);
    }
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
