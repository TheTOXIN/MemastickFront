import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';
import {LoaderStatus} from '../../consts/LoaderStatus';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent {

  public status;
  public message;

  isHovering = false;
  isPreview = false;
  isCreate = false;

  public imageFile: File;
  public imgURL: any;

  private fireId: UUID;

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    this.remove();
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
    if (files[0].type.match(/image\/*/) == null) { return; }

    this.status = LoaderStatus.LOAD;
    this.imageFile = files[0];
    this.fireId = UUID.UUID();

    this.memeApi.memeUpload(this.imageFile, this.fireId).then(
      () => { this.show(); },
      () => { this.error('Ошибка загрузки'); }
    );
  }

  create() {
    if (!this.isPreview || this.isCreate) { return; }
    this.status = LoaderStatus.LOAD;

    this.memeApi.memeCreate(this.fireId).subscribe(
      () => { this.createDone(); },
      (error) => { this.createError(error); }
    );
  }

  createDone() {
    this.isCreate = true;
    this.status = LoaderStatus.DONE;
    this.message = 'МЕМ создан!';
  }

  createError(error: any) {
    this.remove();

    var errorMessage = '';

    if (error.error.code === 'LESS_TOKEN') { // TODO бля
      errorMessage = 'Вы уже создвали МЕМ';
    } else {
      errorMessage = 'Ошибка создания';
    }

    this.error(errorMessage);
  }

  error(message: string) {
    this.message = message;
    this.status = LoaderStatus.ERROR;
  }

  show() {
    this.isPreview = true;
    this.status = LoaderStatus.NONE;

    const reader = new FileReader();

    reader.readAsDataURL(this.imageFile);
    reader.onload = () => this.imgURL = reader.result;
  }

  memes() {
    this.router.navigateByUrl('/home/memes');
  }

  remove() {
    if (!this.isCreate && this.fireId != null && this.fireId !== '') {
      this.memeApi.memeRemove(this.fireId);
      this.fireId = null;
    }
  }

}
