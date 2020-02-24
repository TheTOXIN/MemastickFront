import {Component, OnInit} from '@angular/core';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ValidConst} from '../../consts/ValidConst';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-avatar-modal',
  templateUrl: './change-avatar-modal.component.html',
  styleUrls: ['./change-avatar-modal.component.scss']
})
export class ChangeAvatarModalComponent implements OnInit {

  public avatarPreviewURL: any;
  public avatarPreviewIMG: File;

  public isPreview = false;
  public message = 'ФОРМАТ JPG ИЛИ PNG';

  constructor(
    public avatarApi: MemetickAvatarApiService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  showAvatar(event) {
    const files = event.target.files;

    if (files.length !== 1) {
      this.message = 'НУЖЕН ТОЛЬКО 1 ФАЙЛ';
      return;
    }

    if (files[0].size > ValidConst.MAX_AVATAR_SIZE) {
      this.message = 'МАКСИМУМ 1 МБ';
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }

    this.avatarPreviewIMG = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => this.avatarPreviewURL = reader.result;

    this.isPreview = true;
  }

  uploadAvatar() {
    if (!this.isPreview) { return; }

    this.avatarApi.uploadAvatar(this.avatarPreviewIMG).subscribe(
      () => {
        this.activeModal.dismiss('Cross click');
        this.router.navigateByUrl('/home/memetick/me');
      },
      () => {
        this.message = 'НЕПРАВИЛЬНЫЙ ФОРМАТ';
        this.isPreview = false;
      }
    );
  }
}
