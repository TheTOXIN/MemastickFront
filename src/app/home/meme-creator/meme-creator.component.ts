import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MemFireService} from '../../services/mem-fire-service';

@Component({
  selector: 'app-meme-creator',
  templateUrl: './meme-creator.component.html',
  styleUrls: ['./meme-creator.component.scss']
})
export class MemeCreatorComponent implements OnInit {

  isPreview = false;
  isCreate = false;
  isHovering: boolean;

  public imagePath;
  public imgURL: any;

  constructor(
    private router: Router,
    private memFire: MemFireService,
  ) {

  }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  showMeme(files) {
    if (files.length !== 1) { return; }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) { return; }

    this.imagePath = files;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => this.imgURL = reader.result;

    this.isPreview = true;
  }

  upload() {
    if (!this.isPreview) { return; }
    this.memFire.startUpload(this.imagePath);
    this.isCreate = true;
  }

}
