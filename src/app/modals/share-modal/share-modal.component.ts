import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {API} from '../../consts/API';
import {GlobalConst} from '../../consts/GlobalConst';
import {LocalStorageService} from '../../services/local-storage-service';
import {RoleType} from '../../consts/RoleType';
import {AdminApiService} from '../../api/admin-api-service';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {

  @Input()
  public memeId: UUID;
  public memeURL;

  public role: RoleType;

  constructor(
    public activeModal: NgbActiveModal,
    public storage: LocalStorageService,
    public adminApi: AdminApiService,
  ) {
    this.role = this.storage.getMe().role;
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
    this.adminApi.translate(this.memeId);
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
