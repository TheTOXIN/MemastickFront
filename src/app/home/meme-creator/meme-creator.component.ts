import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnInit {

  isPreview = false;
  isCreate = false;
  isError = false;
  isHovering = false;

  public imageFile: File;
  public imgURL: any;

  public errorMessage;

  constructor(
    private router: Router,
    private memeApi: MemeApiService,
  ) {

  }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  showMeme(files) {
    if (files.length !== 1) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imageFile = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => this.imgURL = reader.result;

    this.isPreview = true;
  }

  upload() {
    if (!this.isPreview) { return; }

    const fireId = UUID.UUID();

    this.memeApi.memeUpload(this.imageFile, fireId)
      .then(
        () => {
          this.memeApi.memeCreate(fireId).subscribe(
            () => {this.isCreate = true;},
            () => {
              this.errorMessage = 'Вы уже создвали МЕМ в этот день';
              this.isError = true;
            }
          );
        },
        () => {
          this.errorMessage = 'Ошибка загрузки, попробуйте позже';
          this.isError = true;
        }
      );
  }

  memes() {
    this.router.navigateByUrl('/home/memes');
  }

}
