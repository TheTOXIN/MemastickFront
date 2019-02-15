import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit {

  @Input()
  private memePreview: string;

  isPreview = false;

  constructor() { }

  ngOnInit() {
  }

  viewShow() {
    this.isPreview = true;
  }

  viewSave() {
    window.location.href = this.memePreview;
  }

  viewClose() {
    this.isPreview = false;
  }

  viewShare() {
    console.log('SAHRE');
  }

}
