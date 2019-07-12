import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-socials-modal',
  templateUrl: './socials-modal.component.html',
  styleUrls: ['./socials-modal.component.scss']
})
export class SocialsModalComponent implements OnInit {

  public data = [{
    img: 'assets/images/social/vk.png',
    txt: 'ВКОНТАКТЕ',
    ref: 'https://vk.com/memastick'
  }, {
    img: 'assets/images/social/telegram.png',
    txt: 'ТЕЛЕГРАММ',
    ref: 'https://telegram.me/memastick'
  }];

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {

  }

  public redirect(url: string) {
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = url;
    document.body.appendChild(a);
    a.click();
  }
}
