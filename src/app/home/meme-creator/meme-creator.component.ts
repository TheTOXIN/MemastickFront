import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';
import {LoaderStatus} from '../../consts/LoaderStatus';
import {ErrorStatus} from '../../consts/ErrorStatus';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnInit {

  public status;
  public message;

  public imageFile: File;
  public imgURL: any;

  public fireId: UUID;
  public firePath: string;

  isHovering = false;
  isPreview = false;

  public isCreate = false;
  public isPossible = true;

  @HostListener('window:popstate', ['$event'])
  onPopStateHandler(event) {
    this.remove();
  }

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

  ngOnInit(): void {
    this.memeApi.memeCreateCheck().subscribe(
      () => {},
      (error) => {
        this.isPossible = false;
        this.createError(error);
      }
    );
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  upload(files) {
    if (!this.isPossible) { return; }
    if (files.length !== 1) { return; }
    if (files[0].type.match(/image\/*/) == null) { return; }

    this.status = LoaderStatus.LOAD;
    this.imageFile = files[0];

    this.fireId = UUID.UUID();
    this.firePath = `memes/${this.fireId}`;

    this.memeApi.memeUpload(this.imageFile, this.firePath).then(
      () => { this.show(); },
      () => { this.error('Ошибка загрузки'); }
    );
  }

  create() {
    if (!this.isPreview || this.isCreate || !this.isPossible) { return; }
    this.status = LoaderStatus.LOAD;

    this.memeApi.memeCreate(this.fireId, this.imgURL).subscribe(
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

    let errorMessage = '';

    if (error.error.code === ErrorStatus.LESS_TOKEN) {
      errorMessage = 'Вы уже создвали МЕМ';
    } else {
      errorMessage = 'Ошибка сервера';
    }

    this.error(errorMessage);
  }

  error(message: string) {
    this.message = message;
    this.status = LoaderStatus.ERROR;
  }

  show() {
    this.memeApi.memeLoad(this.firePath).subscribe(url => {
      this.imgURL = url;
      this.isPreview = true;
      this.status = LoaderStatus.NONE;
    });
  }

  memes() {
    this.router.navigateByUrl('/home/memes');
  }

  remove() {
    if (!this.isCreate && this.firePath != null && this.firePath !== '') {
      this.memeApi.memeRemove(this.firePath);
      this.firePath = null;
    }
  }

}
