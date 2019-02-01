import {Component, Input, OnInit} from '@angular/core';
import {MemetickAvatarApiService} from '../../services/memetick-avatar-api-service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

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

  @Input()
  public nick = '';

  constructor(
    public avatarApi: MemetickAvatarApiService,
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }

  showAvatar(files) {
    if (files.length !== 1) { return; }

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
        window.location.reload();
      },
      () => {
        this.message = 'НЕ ПРАВИЛЬНЫЙ ФОРМАТ';
        this.isPreview = false;
      }
    );
  }

}
