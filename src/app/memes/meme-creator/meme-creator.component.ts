import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {ErrorStatus} from '../../consts/ErrorStatus';
import {TokenApiService} from '../../services/token-api-service';
import {TokenType} from '../../consts/TokenType';
import {TokenAcceptComponent} from '../../home/token-accept/token-accept.component';
import {ValidConst} from '../../consts/ValidConst';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent {

  @ViewChild(TokenAcceptComponent) tokenAccept: TokenAcceptComponent;

  public status;
  public message;

  public imageFile: File;
  public imgURL: any;

  public fireId: UUID;
  public firePath: string;

  isHovering = false;
  isPreview = false;
  isCreate = false;

  constructor(
    private router: Router,
    private memeApi: MemeApiService,
    private tokenApi: TokenApiService,
  ) {
    this.status = LoaderStatus.NONE;
    this.message = '';
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  acceptCreatingShow() {
    if (!this.isPreview || this.isCreate) { return; }
    this.status = LoaderStatus.LOAD;
    this.tokenAccept.show(TokenType.CREATING);
  }

  acceptCreatingResult(accpet: boolean) {
    if (accpet) {
      this.create();
    } else {
      this.status = LoaderStatus.NONE;
    }
  }

  upload(files) {
    if (files.length !== 1) { return; }
    if (files[0].type.match(/image\/*/) == null) { return; }
    if (files[0].size > ValidConst.MAX_MEME_SIZE) { return; }

    this.status = LoaderStatus.LOAD;

    this.tokenApi.have(TokenType.CREATING).subscribe(
      () => this.show(files),
      (error) => this.createError(error)
    );
  }

  create() {
    if (!this.isPreview || this.isCreate) { return; }
    this.status = LoaderStatus.LOAD;

    this.fireId = UUID.UUID();
    this.firePath = `memes/${this.fireId}`;

    this.memeApi.memeUpload(this.imageFile, this.firePath).then(
      () => {
        this.memeApi.memeLoad(this.firePath).subscribe(url => {
          this.memeApi.memeCreate(this.fireId, url).subscribe(
            () => { this.createDone(); },
            (error) => { this.createError(error); }
            );
        });
      },
      () => {
        this.error('Ошибка загрузки');
      }
    );
  }

  createDone() {
    this.isCreate = true;
    this.status = LoaderStatus.DONE;
    this.message = 'МЕМ создан!';
  }

  createError(error: any) {
    let errorMessage = '';

    if (error.error.code === ErrorStatus.LESS_TOKEN) {
      errorMessage = 'Нужен токен создания!';
    } else {
      errorMessage = 'Ошибка создания';
    }

    this.error(errorMessage);
  }

  show(files) {
    this.imageFile = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(this.imageFile);
    reader.onload = () => this.imgURL = reader.result;

    this.isPreview = true;
    this.status = LoaderStatus.NONE;
  }

  error(message: string) {
    this.message = message;
    this.status = LoaderStatus.ERROR;
  }

  memes() {
    this.router.navigateByUrl('/memes');
  }
}