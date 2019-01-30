import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';
import {LoaderStatus} from '../../consts/LoaderStatus';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnDestroy {

  public status;
  public message;

  isHovering = false;
  isPreview = false;
  isCreate = false;

  public imageFile: File;
  public imgURL: any;

  private fireId: UUID;

  ngOnDestroy() {
    if (!this.isCreate) {
      this.memeApi.memeRemove(this.fireId);
    }
  }

  constructor(
    private router: Router,
    private memeApi: MemeApiService,
  ) {
    this.status = LoaderStatus.NONE;
    this.message = '';
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  upload(files) {
    if (files.length !== 1) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }

    this.isPreview = true;

    this.imageFile = files[0];
    this.fireId = UUID.UUID();

    this.memeApi.memeUpload(this.imageFile, this.fireId).then(
      () => { this.show(); },
      () => { this.error('Ошибка загрузки, попробуйте позже'); }
    );
  }

  create() {
    this.status = LoaderStatus.DONE;
    this.message = "МЕМ создан!";
    if (!this.isPreview) { return; }
    // TODO не давать создавать когда бдует список токенов

    this.memeApi.memeCreate(this.fireId).subscribe(
      () => {
        this.isCreate = true;
      },
      (error) => {
        this.memeApi.memeRemove(this.fireId);
        if (error.error.code === 'LESS_TOKEN') { // TODO бля
          this.error('Вы уже создвали МЕМ в этот день');
        } else {
          this.error('Ошибка создания МЕМА');
        }
      }
    );
  }

  show() {
    const reader = new FileReader();
    reader.readAsDataURL(this.imageFile);
    reader.onload = () => this.imgURL = reader.result;
  }

  toMemes() {
    this.router.navigateByUrl('/home/memes');
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  error(message: string) {
    this.message = message;
  }

}
