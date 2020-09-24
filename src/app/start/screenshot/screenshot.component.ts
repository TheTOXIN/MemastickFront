import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageModalComponent} from '../../modals/image-modal/image-modal.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

  public screens = [
    'Дом',
    'Лента',
    'Битвы',
    'Меню',
    'Мемотипы',
    'Создние',
    'Майнинг',
    'Профиль'
  ];

  public screenCarousel: any = {
    loop: true,
    margin: 15,
    nav: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2,
      },
      600: {
        items: 2
      },
      767: {
        items: 2
      },
      768: {
        items: 2,
      },
      992: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };

  constructor(
    public modalService: NgbModal,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  openModal(title: string, image: string) {
    const modalRef = this.modalService.open(ImageModalComponent, {'centered': true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.image = image;
  }
}
