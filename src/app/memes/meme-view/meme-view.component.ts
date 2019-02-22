import {Component, Input, OnInit} from '@angular/core';
import {MemeApiService} from '../../services/meme-api-service';
import {UUID} from 'angular2-uuid';
import {MemeData} from '../../model/MemeData';
import {Meme} from '../../model/Meme';

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit {

  @Input()
  private meme: Meme;

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
    this.memeApi.memeDownload(this.meme.url).subscribe((res) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = this.meme.id + '';
      document.body.appendChild(a);
      a.click();
    });
  }

  viewShare() {
    const memeURL = location.origin + '/memes/share/' + this.meme.id;
    const shareURl = 'tg://msg?text=' + memeURL;
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = shareURl;
    document.body.appendChild(a);
    a.click();
  }
}
