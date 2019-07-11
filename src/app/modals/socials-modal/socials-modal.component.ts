import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-socials-modal',
  templateUrl: './socials-modal.component.html',
  styleUrls: ['./socials-modal.component.scss']
})
export class SocialsModalComponent implements OnInit {

// <img src="assets/images/social/vk.png">
//   <img src="assets/images/social/telegram.png">

  constructor(
    public activeModal: NgbActiveModal
  ) {

  }

  ngOnInit() {

  }

  vkontakte() {
    this.redirect('https://vk.com/memastick');
  }

  telegram() {
    this.redirect('https://telegram.me/memastick');
  }

  private redirect(url: string) {
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.href = url;
    document.body.appendChild(a);
    a.click();
  }
}
