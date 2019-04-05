import {Component, Input, OnInit} from '@angular/core';
import {MemeApiService} from '../../api/meme-api-service';
import {Meme} from '../../model/Meme';
import {API} from '../../consts/API';

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit {

  @Input()
  public meme: Meme;

  isPreview = false;

  constructor(
    private memeApi: MemeApiService
  ) {

  }

  ngOnInit() {
  }

  viewShow(meme: Meme) {
    this.meme = meme;
    this.isPreview = true;
  }

  viewClose() {
    this.meme = null;
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
    const memeURL = API.DOMAIN_URL + '/memes/share/' + this.meme.id;
    const shareURl = 'tg://msg?text=' + memeURL;
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = shareURl;
    document.body.appendChild(a);
    a.click();
  }
}
