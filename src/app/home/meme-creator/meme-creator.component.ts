import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnDestroy {

  isHovering = false;
  isPreview = false;

  isCreate = false;
  isError = false;
  isLoading = false;

  public imageFile: File;
  public imgURL: any;

  public errorMessage;

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

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  upload(files) {
    if (files.length !== 1) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }

    this.isLoading = true;
    this.isPreview = true;

    this.imageFile = files[0];
    this.fireId = UUID.UUID();

    this.memeApi.memeUpload(this.imageFile, this.fireId).then(
      () => {this.show();},
      () => {this.error('Ошибка загрузки, попробуйте позже');}
    );
  }

  create() {
    if (!this.isPreview) { return; }
    // TODO не давать создавать когда бдует список токенов
    this.isLoading = true;

    this.memeApi.memeCreate(this.fireId).subscribe(
      () => {
        this.isLoading = false;
        this.isCreate = true;
      },
      (error) => {
        this.memeApi.memeRemove(this.fireId);
        if (error.error.code === 'LESS_TOKEN') { //TODO бля
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
    this.isLoading = false;
  }

  toMemes() {
    this.router.navigateByUrl('/home/memes');
  }

  toHome() {
    this.router.navigateByUrl('/home');
  }

  error(message: String) {
    this.errorMessage = message;
    this.isLoading = false;
    this.isError = true;
  }

}
