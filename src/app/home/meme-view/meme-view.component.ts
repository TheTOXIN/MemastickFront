import {Component, Input, OnInit} from '@angular/core';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit {

  @Input()
  private memePreview: string;

  isPreview = false;

  constructor(
    private memeApi: MemeApiService
  ) {

  }

  ngOnInit() {
  }

  viewShow() {
    this.isPreview = true;
  }

  viewClose() {
    this.isPreview = false;
  }

  viewSave() {
    this.memeApi.memeDownload(this.memePreview).subscribe((res) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = UUID.UUID();
      document.body.appendChild(a);
      a.click();
    });
  }

  viewShare() {
    console.log('SAHRE');
  }
}
