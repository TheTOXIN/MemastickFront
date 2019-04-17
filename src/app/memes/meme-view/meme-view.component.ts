import {Component, Input, OnInit} from '@angular/core';
import {MemeApiService} from '../../api/meme-api-service';
import {Meme} from '../../model/Meme';
import {API} from '../../consts/API';
import {ChangeNickModalComponent} from '../../modals/change-nick-modal/change-nick-modal.component';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemetickComponent} from '../../home/memetick/memetick.component';
import {ShareModalComponent} from '../../modals/share-modal/share-modal.component';

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
    private memeApi: MemeApiService,
    private _sanitizer: DomSanitizer,
    private modalService: NgbModal
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
    const modalRef = this.modalService.open(ShareModalComponent, {'centered': true});
    modalRef.componentInstance.memeId = this.meme.id;
  }
}
