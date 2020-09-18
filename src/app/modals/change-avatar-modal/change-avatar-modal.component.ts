import {Component, OnInit} from '@angular/core';
import {MemetickAvatarApiService} from '../../api/memetick-avatar-api-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ValidConst} from '../../consts/ValidConst';
import {Router} from '@angular/router';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-change-avatar-modal',
  templateUrl: './change-avatar-modal.component.html',
  styleUrls: ['./change-avatar-modal.component.scss']
})
export class ChangeAvatarModalComponent implements OnInit {

  public avatarEvent: any;
  public avatarCropped: Blob;

  public isPreview = false;
  public isUpload = false;

  public message = 'JPG ИЛИ PNG ДО 5 МБ';

  constructor(
    public avatarApi: MemetickAvatarApiService,
    public activeModal: NgbActiveModal,
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  loadAvatar(event) {
    if (this.validAvatar(event)) {
      this.avatarEvent = event;
    }
  }

  previewAvatar() {
    this.isPreview = true;
  }

  croppedAvatar(event: ImageCroppedEvent) {
    const data = event.base64;
    this.avatarCropped = base64ToFile(data);
  }

  uploadAvatar() {
    if (!this.isPreview) { return; }
    if (this.isUpload) { return; }

    this.isUpload = true;
    this.avatarApi.uploadAvatar(this.avatarCropped).subscribe(
      () => {
        this.activeModal.dismiss('Cross click');
        this.router.navigateByUrl('/home');
      },
      () => {
        this.message = 'НЕПРАВИЛЬНЫЙ ФОРМАТ';
        this.isPreview = false;
      },
      () => {
        this.isUpload = false;
      }
    );
  }

  private validAvatar(event): boolean {
    const files = event.target.files;

    if (files.length !== 1) {
      this.message = 'НУЖЕН ТОЛЬКО 1 ФАЙЛ';
      return false;
    }

    if (files[0].size > ValidConst.MAX_AVATAR_SIZE) {
      this.message = 'МАКСИМУМ 5 МБ';
      return false;
    }

    if (files[0].type.match(/image\/*/) == null) {
      this.message = 'ОШИБКА ЗАГРУЗКИ';
      return false;
    }

    return true;
  }
}
