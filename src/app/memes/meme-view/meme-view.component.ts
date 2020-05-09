import {Component, OnInit} from '@angular/core';
import {MemeApiService} from '../../api/meme-api-service';
import {Meme} from '../../model/Meme';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ShareModalComponent} from '../../modals/share-modal/share-modal.component';

@Component({
  selector: 'app-meme-view',
  templateUrl: './meme-view.component.html',
  styleUrls: ['./meme-view.component.scss']
})
export class MemeViewComponent implements OnInit {

  public meme: Meme;
  public url: string;

  isPreview = false;
  isControl = false;

  constructor(
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {

  }

  ngOnInit() {
  }

  viewShow(meme: Meme) {
    this.meme = meme;
    this.url = this.meme.url;
    this.isPreview = true;
    this.isControl = true;
  }

  viewUrl(url: string) {
    this.url = url;
    this.isPreview = true;
    this.isControl = false;
  }

  viewClose() {
    this.meme = null;
    this.isPreview = false;
  }

  viewSave() {
    if (!this.isControl) { return; }
    this.memeApi.memeDownload(this.url).subscribe((res) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = this.meme.id + '';
      document.body.appendChild(a);
      a.click();
    });
  }

  viewShare() {
    if (!this.isControl) { return; }
    const modalRef = this.modalService.open(ShareModalComponent, {'centered': true});
    modalRef.componentInstance.memeId = this.meme.id;
  }
}
