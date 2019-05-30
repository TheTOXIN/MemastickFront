import {Component, Input, OnInit} from '@angular/core';
import {UUID} from 'angular2-uuid';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {API} from '../../consts/API';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {

  @Input()
  public memeId: UUID;

  public memeURL;

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.memeURL = GlobalConst.FRONT_URL + '/memes/share/' + this.memeId;
  }

  cp(input) {
    input.select();
    document.execCommand('copy');
    input.setSelectionRange(0, 0);
  }

  tg() {
    this.share('tg://msg?text=');
  }

  vk() {
    this.share('https://vk.com/share.php?url=');
  }

  share(source: string) {
    const shareURl = source + this.memeURL;
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = shareURl;
    document.body.appendChild(a);
    a.click();
  }
}
