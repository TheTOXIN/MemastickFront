import {Component, ElementRef, OnInit} from '@angular/core';
import {VK_CHAT} from '../../app.constants';

@Component({
  selector: 'app-vk-chat',
  templateUrl: './vk-chat.component.html',
  styleUrls: ['./vk-chat.component.scss']
})
export class VkChatComponent implements OnInit {

  full = false;

  constructor(
    private elementRef: ElementRef
  ) {

  }

  ngOnInit() {
    if (VK_CHAT) {
      const ss = document.createElement('script');

      ss.type = 'text/javascript';
      ss.innerText = 'VK.Widgets.Comments("vk_comments", {limit: 5, attach: false}, );';

      this.elementRef.nativeElement.appendChild(ss);
    }
  }

  fullChat() {
    this.full = !this.full;
  }
}
